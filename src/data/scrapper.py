from urllib.request import Request, urlopen
import bs4
import os
import csv
from random import uniform
from time import sleep


# Script parameters
url = 'https://www.brewersfriend.com/homebrew-recipes/page/'
row_len = 10 # Number of columns that each row must have to match the desired data
start_page = 1 # Scraping range from
end_page = 10 # Scraping range to (add one)
output_file_name = 'scraped_data.csv'
del_if_exists = True # Delete the log file before start if already exist

# Number of columns of interest
col_numbers = {
    'name': 0,
    'style': 1,
    'abv': 5,
    'ibu': 6,
    'color': 7
}


def request_page(url, page_num): # Request page and return data table as array
    pn = str(page_num)
    print('Requesting page ' + pn + '...')
    req = Request(url + pn, headers = {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36'})
    content = urlopen(req, timeout = 10).read()

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
    else:
        print('Empty page or request timed out')

    return data


def extract_columns(row, col_numbers): # Extract the columns of interest
    return [ row[col_numbers['name']], row[col_numbers['style']], row[col_numbers['abv']], row[col_numbers['ibu']], row[col_numbers['color']] ]


def random_pause(): # Random pause to simulate human user
    sleep(uniform(1,10))


def write_to_file(filename, data): # Write table to csv file
    print('Writing ' + str(len(data)) + ' lines to file ' + filename + '...')

    with open(filename, 'a') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames = ['name', 'style', 'abv', 'ibu', 'color'])
        writer.writeheader()
        for r in data:
            writer.writerow({
                'name': r[0],
                'style': r[1],
                'abv': r[2],
                'ibu': r[3],
                'color': r[4]
            })
        
    print('Data written.')



# Check if file exists before begin
if os.path.exists(filename) and del_if_exists:
        print('File already exist, deleting...')
        os.remove(filename)

# Start scrapping
for n in range(start_page, end_page):
    data = request_page(url, n)
    output = [ extract_columns(d, col_numbers) for d in data if len(d) == row_len ]
    write_to_file(output_file_name, output)
    if n < end_page - start_page - 1:
        random_pause()

        