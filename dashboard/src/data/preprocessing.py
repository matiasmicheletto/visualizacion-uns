import pandas as pd

# Cargar datos
filepath = 'Brewers_Friend_Recipes.csv'
data = pd.read_csv(filepath, index_col = 'BeerID', encoding = 'latin-1')

# Mostrar primeras filas
#print(data.head())
#print(data.describe())

# Seleccionar datos que no se van a usar
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
            .drop(columns = not_relevant_columns, axis=1) \
            .sample(frac = 0.2)

# Submuestrear
ss_data = clean_data
            
ss_data.to_json('Brewers_Friend_Recipes.json', orient='records')