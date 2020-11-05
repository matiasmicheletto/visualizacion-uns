import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Cargar datos
filepath = '../data/Brewers_Friend_Recipes.csv'
data = pd.read_csv(filepath, index_col = 'BeerID', encoding = 'latin-1')

# Mostrar primeras filas
#print(data.head())
#print(data.describe())

# Seleccionar datos que no se van a usar
not_relevant_columns = ['URL', 'StyleID', 'Size(L)', 'BoilSize', 'BoilTime', 'BoilGravity', 'Efficiency', 'MashThickness', 'SugarScale', 'BrewMethod', 'PitchRate', 'PrimaryTemp', 'PrimingMethod', 'PrimingAmount', 'UserId']



# Obtener las 10 primeras clases mas comunes
popularity = data['Style'].value_counts(normalize=True) # Contar
top_ten = popularity[:10] # Obtener 10 primeras
top_ten_styles = list(top_ten.keys()) # Obtener solo los nombres de las clases
print('Estilos más comunes:')
print(top_ten)
print('\n\n')



# Quitar los datos cuyas clases no pertenecen a las 10 primeras
clean_data = data[ data['Style'].isin( top_ten_styles ) ] \
            .drop(columns = not_relevant_columns, axis=1)
# Submuestrear
ss_data = clean_data.sample(frac = 0.03)
            
print('Datos limpios:')
print(ss_data)
print('\n\n')


# Graficar matrices de datos dispersos submuestreando al 3% (1000 datos)
plt.figure()
sns.pairplot(ss_data, hue="Style")


# Aislar una sola relacion para ampliar
plt.figure()
sns.scatterplot(x = ss_data['Color'],  y = ss_data['ABV'],  hue = ss_data['Style'])




# Normalizar las columnas numericas
scaled_data = ss_data
columns = ['OG', 'FG', 'ABV', 'IBU', 'Color']
for col in columns:
    scaled_data[col] = ((scaled_data[col]-scaled_data[col].min())/(scaled_data[col].max()-scaled_data[col].min()))*100

# Grafico de coordenadas paralelas con valores normalizados
plt.figure()
pd.plotting.parallel_coordinates(scaled_data, class_column = 'Style', cols = columns, colormap = 'tab10')



plt.show()
