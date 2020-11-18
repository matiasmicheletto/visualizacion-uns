import pandas as pd
import numpy as np
from scipy.stats import zscore
import scipy.linalg as la
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
import seaborn as sns
import math

## Datos

filepath = 'brewers_friend_recipes_database.csv' # Base de datos crudos
clean_data_file_name = 'brewers_friend_recipes.json' # Archivo a exportar con datos limpios
styles_distribution_file_name = 'beer_styles_distribution.json' # Archivo con modelo de distribuciones para clasificacion de estilos

data = pd.read_csv(filepath, index_col = 'BeerID', encoding = 'latin-1')



## Estilos del dataset

styles_count = data['Style'].value_counts() # Frecuencia de cada clase
styles = list(styles_count.keys()) # Lista completa de estilos
popularity = data['Style'].value_counts(normalize=True) # Proporción de cada clase
top_ten = popularity[:10] # 10 estilos de mayor frecuencia
top_ten_styles = list(top_ten.keys()) # Nombres de las clases

# Imprimir resultados
print('Estilos totales: ',len(styles))
print(" ")
print('Estilos más comunes:')
print(top_ten)


## Variables de interés
relevant_columns = ['IBU', 'Color', 'ABV'] # Variables a utilizar
not_relevant_columns = ['FG', 'OG', 'URL', 'StyleID', 'Size(L)', 'BoilSize', 'BoilTime', 'BoilGravity', 'Efficiency', 'MashThickness', 'SugarScale', 'BrewMethod', 'PitchRate', 'PrimaryTemp', 'PrimingMethod', 'PrimingAmount', 'UserId'] # Variables a descartar

# Quitar las columnas que no se van a utilizar
data = data.drop(columns = not_relevant_columns, axis = 1);



## Gráfico de datos dispersos

top_ten_data = data[ data['Style'].isin( top_ten_styles ) ]

fig1 = plt.figure(1)
fig1.set_figheight(9)
fig1.set_figwidth(12)
ax = fig1.add_subplot(111, projection = '3d')

clean_data = pd.DataFrame(columns = data.columns) # Recopilar datos en otro dataframe
for s in top_ten_styles:
    temp = top_ten_data.loc[ top_ten_data['Style'] == s ] # Subconjunto de cada estilo
    temp = temp.loc[(abs(zscore(temp[relevant_columns])) < 1).all(axis = 1)].sample(frac = 0.25) # Quitar atípicos y submuestrear
    clean_data = clean_data.append(temp) # Adjuntar al conjunto de datos limpios
    ax.scatter(temp['Color'], temp['ABV'], temp['IBU'], label = s) # Agregar set al grafico

ax.set_xlabel('Color')
ax.set_ylabel('ABV')
ax.set_zlabel('IBU')
plt.legend(loc = 2)

plt.savefig('Scatter3D.png')

clean_data = clean_data.sample(frac = 1) # Para mezclar los estilos y que no esten ordenados

# Exportar datos limpios a formato json
clean_data.to_json(clean_data_file_name, orient = 'records')




## Matriz de datos dispersos

fig2 = plt.figure(2)
fig2.set_figheight(10)
fig2.set_figwidth(20)
sns.pairplot(clean_data, hue = "Style");

plt.savefig('ScatterMatrix.png')



## Distribución de variables de interes

fig3, ax3 = plt.subplots(len(relevant_columns),1)
fig3.set_figheight(20)
fig3.set_figwidth(20)

for idx, v in enumerate(relevant_columns):
    f = sns.violinplot(ax = ax3[idx], x = "Style", y = v, data = clean_data)
    f.grid()
    f.set_xticklabels(ax3[idx].xaxis.get_majorticklabels(), rotation = 30)

plt.savefig('VariableDistribution.png')



## Generar datos para cálculos de clasificación de estilos

mean_mat_cols = ["u_{}".format(v) for v in relevant_columns] # Nombre de las columnas de promedio
cov_mat_cols = ["s{}{}".format(j+1,k+1) for j in range(len(relevant_columns)) for k in range(len(relevant_columns))] # Nombre de las columnas de los indices de la matriz de covarianza
new_cols = ['Style', 'Freq'] + mean_mat_cols + cov_mat_cols # Todas las columnas del dataframe a exportar

distribution = pd.DataFrame(columns = new_cols) # Resultado a exportar
ctr = 0 # Contador de fila dataframe
for s in styles:
    temp = data.loc[ data['Style'] == s ] # Subconjunto de cada estilo
    temp = temp.loc[(abs(zscore(temp[relevant_columns])) < 2).all(axis = 1)] # Quitar atípicos
    
    freq = len(temp.index) # Cantidad de recetas del estilo actual
    avgs = temp.mean() # Promedio
    cov = temp.cov() # Matriz de covarianza del conjunto
    
    if freq < 100: # No agregar si hay menos de 100 observaciones
        continue
    if la.det(cov) < 0.01: # La matriz de covarianza debe ser invertible
        print("Estilo", s, "tiene matriz de covarianza singular")        
        continue

    inv_cov = pd.DataFrame(la.inv(cov.values), cov.columns, cov.index) # Inversa de la covarianza
    
    # Generar fila del dataframe
    row = (s, freq) # Estilo y frecuencia     
    for v in relevant_columns:
        row = row + (avgs[v],) # Agregar promedios
    for i, vi in inv_cov.items(): # Para cada fila
        for j, vj in vi.items(): # Para cada columna
            row = row + (vj, ) # Agregar indices de la matriz de covarianza inv
    
    distribution = distribution.append( pd.DataFrame([row], columns = new_cols, index = [ctr]) )
    ctr = ctr + 1

# Exportar a formato json
distribution.to_json(styles_distribution_file_name, orient = 'records')




## Ejemplo: Clasificacion de estilos

def mahalanobis(x, data): # Distancia de Mahalanobis
    x_mu = x - data.mean() # x - u
    cov = data.cov() # Matriz de covariancia del conjunto de datos
    cov_inv = pd.DataFrame(la.inv(cov.values), cov.columns, cov.index) # Inversa de la matriz de covarianza
    m = x_mu.dot(cov_inv).dot(x_mu.T) # Formula de Mahalanobis cuadratica
    return math.sqrt(m)


# Nuevo estilo de cerveza (aleatorio)
sx = pd.Series([5.36, 25.21, 10.61], index = ['ABV', 'IBU', 'Color'])

results = {}
for s in top_ten_styles:
    temp = clean_data.loc[ clean_data['Style'] == s ]
    m = mahalanobis(sx, temp)
    results[s] = m
    
# Imprimir datos ordenados
for k, v in sorted(results.items(), key = lambda item: item[1]):
    print("{}: {:.2f}".format(k,v)) 

