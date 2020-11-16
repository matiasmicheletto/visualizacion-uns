import pandas as pd
import numpy as np
from scipy.stats import zscore


filepath = 'Brewers_Friend_Recipes.csv'
output_file_name = 'Brewers_Friend_Recipes.json'

# Cargar datos
data = pd.read_csv(filepath, index_col = 'BeerID', encoding = 'latin-1')

# Mostrar primeras filas
#print(data.head())
#print(data.describe())

# Separar variables de interes
relevant_columns = ['IBU', 'Color', 'ABV']
not_relevant_columns = ['FG', 'OG', 'URL', 'StyleID', 'Size(L)', 'BoilSize', 'BoilGravity', 'Efficiency', 'MashThickness', 'SugarScale', 'BrewMethod', 'PitchRate', 'PrimaryTemp', 'PrimingMethod', 'PrimingAmount', 'UserId']

# Obtener las 10 primeras clases mas comunes
popularity = data['Style'].value_counts(normalize=True) # Contar
top_ten = popularity[:10] # Obtener 10 primeras
top_ten_styles = list(top_ten.keys()) # Obtener solo los nombres de las clases
print('Estilos más comunes:')
print(top_ten)
print('\n\n')

# Quitar los datos cuyas clases no pertenecen a las 10 primeras
clean_data = data[ data['Style'].isin( top_ten_styles ) ] \
            .drop(columns = not_relevant_columns, axis=1);

# Quitar outliers dentro de cada estilo
result = pd.DataFrame(columns = clean_data.columns)
for style in top_ten_styles:
    temp = clean_data.loc[ clean_data['Style'] == style ]
    temp = temp.loc[(np.abs(zscore(temp[relevant_columns])) < 0.7).all(axis=1)]
    result = result.append(temp)

result = result.sample(frac = 0.3)

# Exportar a formato json
result.to_json(output_file_name, orient='records')