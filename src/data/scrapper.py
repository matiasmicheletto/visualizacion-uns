from urllib.request import Request, urlopen
import bs4
import os
import csv
from random import uniform, sample
from time import sleep


# Script parameters
url = 'https://www.brewersfriend.com/homebrew-recipes/page/'
row_len = 10 # Number of columns that each row must have to match the desired data
start_page = 1 # Scraping range from
end_page = 200 # Scraping range to (add one)
output_file_name = 'scraped_data.csv'
del_if_exists = True # Delete the log file before start if already exist
request_timeout = 10 # If the request takes too much time, stop scrapper

# Indexes of columns of interest (may change on website version)
col_numbers = {
    'name': 0, # Recipe name (may contain commas)
    'style': 1, # Recipe style (may contain commas)
    'abv': 5,
    'ibu': 6,
    'color': 7
}


def load_user_agents(): # Load a list of user agents from txt file
    ua = []
    with open('user-agents.txt', 'r') as fd:
        reader = csv.reader(fd)
        for row in reader:
            ua.append(row[0])
    return ua 


def request_page(url, page_num, user_agent): # Request page and return data table as array
    pn = str(page_num)
    print('Requesting page ' + pn + ' -- (UA = ' + user_agent + ')...', end = '')
    req = Request(url + pn, headers = {'User-Agent': user_agent, 'Referer': 'https://www.google.com'})
    content = urlopen(req, timeout = request_timeout).read()

    data = []

    if len(content) > 0:
        soup = bs4.BeautifulSoup(content, 'html.parser')
        table = soup.find('table')
        table_body = table.find_all('tbody')[1]
        rows = table_body.find_all('tr')

        for row in rows:
            col_numbers = row.find_all('td')
            col_numbers = [ele.text.strip() for ele in col_numbers]
            data.append([ele for ele in col_numbers if ele])
        
        print(' Done.')
    else:
        print('\nEmpty page or request timed out')

    return data


def extract_columns(row, col_numbers): # Extract the columns of interest
    r = [ 
        row[col_numbers['name']], 
        row[col_numbers['style']], 
        row[col_numbers['abv']], 
        row[col_numbers['ibu']], 
        row[col_numbers['color']] 
    ]

    for k,el in enumerate(r): # Remove commas
        r[k] = r[k].replace(',','')

    return r


def write_to_file(filename, data): # Write table to csv file
    print('Writing ' + str(len(data)) + ' lines to file ' + filename + '...', end = '')

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
        
    print(' Done.\n')


def random_pause(): # Random pause to simulate human user
    sleep(uniform(1, 5))


# Obtain the user agent list
ua = load_user_agents()

# Check if file exists before begin
if os.path.exists(output_file_name) and del_if_exists:
        print('File already exist, deleting...', end = '')
        os.remove(output_file_name)
        print(' Done.')

# Start scrapping
for n in range(start_page, end_page):
    data = request_page(url, n, sample(ua,1)[0])
    output = [ extract_columns(d, col_numbers) for d in data if len(d) == row_len ]
    write_to_file(output_file_name, output)
    if n < end_page - start_page - 1:
        random_pause()

