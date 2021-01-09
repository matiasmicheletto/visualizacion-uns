import requests
import bs4
import os
import csv
from random import uniform, sample
from time import sleep
import argparse
import urllib3 # For disable warnings only


# Script parameters
url = 'https://www.brewersfriend.com/homebrew-recipes/page/'
row_len = 10 # Number of columns that each row must have to match the desired data
start_page = 2000 # Scraping range from
end_page = 3000 # Scraping range to (add one)
del_if_exists = True # Delete the log file before start if already exist
request_timeout = 30 # If the request takes too much time, stop scrapper
ua_database = 'user-agents.txt' # File with a list of user agents

# Indexes of columns of interest (may change on website version)
col_numbers = {
    'name': 0, # Recipe name (may contain commas)
    'style': 1, # Recipe style (may contain commas)
    'abv': 5,
    'ibu': 6,
    'color': 7 # Contains unit (° L)
}


def load_user_agents(): # Load a list of user agents from txt file
    ua = []
    if os.path.exists(ua_database):
        print('Loading user-agents...', end = '', flush = True)
        with open(ua_database, 'r') as fd:
            reader = csv.reader(fd)
            for row in reader:
                ua.append(row[0])
            print(' Done.')
    else: # If the database is not found
        print('User agent list not found, using default value')
        ua = ['Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36']
    return ua 


def request_page(url, page_num, user_agent): # Request page and return data table as array
    pn = str(page_num)
    data = []

    print('Requesting page ' + pn + ' -- (UA = ' + user_agent + ')...', end = '', flush = True)
    try:
        req = requests.get(url + pn, headers = {'user-agent': user_agent, 'referer': 'https://www.google.com'}, timeout = request_timeout, verify = False)
    except requests.HTTPError:
        print(' HTTP Error')
    except requests.ConnectionError:    
        print(' Connection Error')
    #except requests.SSLError:
    #    print(' SSL Error')
    except requests.Timeout:
        print(' Socket timed out')
    else:
        content = req.content
        print(' Done.')
        if len(content) > 0: # Check if content is empty or not
            print('Parsing content... ', end = '')
            soup = bs4.BeautifulSoup(content, 'html.parser')
            table = soup.find('table')
            if table is not None: # Sometimes this table comes empty
                tbody_list = table.find_all('tbody') # In the web, there are 2 tbody, maybe they fix this later
                if tbody_list is not None and len(tbody_list) >= 2:
                    table_body = tbody_list[1]
                    rows = table_body.find_all('tr')

                    for row in rows:
                        col_numbers = row.find_all('td')
                        col_numbers = [ele.text.strip() for ele in col_numbers]
                        data.append([ele for ele in col_numbers if ele])
                else:
                    print('\nTable without rows.')
            else:
                print('\nTable not found.')
            
            print(' Done.', flush = True)

    return data


def extract_columns(row, col_numbers): # Extract the columns of interest
    r = [ 
        row[col_numbers['name']], 
        row[col_numbers['style']], 
        row[col_numbers['abv']], 
        row[col_numbers['ibu']], 
        row[col_numbers['color']].replace(' °L','') # Remove unit symbol
    ]

    for k,el in enumerate(r): # Remove commas
        r[k] = r[k].replace(',','')

    return r


def write_to_file(filename, data): # Write table to csv file
    print('Writing ' + str(len(data)) + ' lines to file ' + filename + '...', end = '', flush = True)

    with open(filename, 'a') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames = ['name', 'style', 'abv', 'ibu', 'color'])
        #writer.writeheader()
        for r in data:
            writer.writerow({
                'name': r[0],
                'style': r[1],
                'abv': r[2],
                'ibu': r[3],
                'color': r[4]
            })
        
    print(' Done.\n', flush = True)


def random_pause(): # Random pause to simulate human user
    s = round(uniform(3, 6))
    print('Waiting for {} seconds'.format(s), flush = True)
    sleep(s)




if __name__ == '__main__':

    # Because sometimes requests throw SSL error, using verify = False shows warnings every loop
    urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

    # Get optional arguments
    parser = argparse.ArgumentParser(description = "Brewer's Friend database scrapper")
    parser.add_argument('-s','--start_page', help = 'Start page number', required = False)
    parser.add_argument('-e','--end_page', help = 'End page number', required = False)
    parser.add_argument('-f','--output_file', help = 'CSV output file name', required = False)
    args = parser.parse_args()

    start_page = int(args.start_page)
    end_page = int(args.end_page)

    # By default, the output file name contains the first scrapped page, in case it halts due to error
    if args.output_file is not None:
        output_file_name = args.output_file
    else:
        output_file_name = 'scraped_data_' + str(start_page) + '.csv'

    print('Scrapping pages ' + str(start_page) + ' to ' + str(end_page))

    # Obtain the user agent list
    ua = load_user_agents()

    # Check if file exists before begin
    print(output_file_name)

    if os.path.exists(output_file_name) and del_if_exists:
        print('File already exist, deleting...', end = '', flush = True)
        os.remove(output_file_name)
        print(' Done.', flush = True)

    # Begin scrapping
    n = start_page
    while n < end_page:
        data = request_page(url, n, sample(ua,1)[0])
        
        if len(data) > 0:
            output = [ extract_columns(d, col_numbers) for d in data if len(d) == row_len ]
            write_to_file(output_file_name, output)
            n = n+1 # Go to next page only if data acquired is valid
        
        random_pause()
