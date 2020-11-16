import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
from scipy.stats import zscore
from mpl_toolkits.mplot3d import Axes3D
import itertools



filepath = 'Brewers_Friend_Recipes.csv'


# Cargar datos
data = pd.read_csv(filepath, index_col = 'BeerID', encoding = 'latin-1')

# Mostrar primeras filas
#print(data.head())
#print(data.describe())

# Separar variables de interes
relevant_columns = ['IBU', 'Color', 'ABV']
not_relevant_columns = ['FG', 'OG', 'URL', 'StyleID', 'Size(L)', 'BoilSize', 'BoilTime', 'BoilGravity', 'Efficiency', 'MashThickness', 'SugarScale', 'BrewMethod', 'PitchRate', 'PrimaryTemp', 'PrimingMethod', 'PrimingAmount', 'UserId']


# Obtener las 10 primeras clases mas comunes
popularity = data['Style'].value_counts(normalize=True) # Contar
top_ten = popularity[:10] # Obtener 10 primeras
top_ten_styles = list(top_ten.keys()) # Obtener solo los nombres de las clases
print('Estilos más comunes:')
print(top_ten)
print('\n\n')


# Quitar los datos cuyas clases no pertenecen a las 10 primeras
cd = data[ data['Style'].isin( top_ten_styles ) ] \
            .drop(columns = not_relevant_columns, axis=1)


# Quitar outliers dentro de cada estilo
ndf = pd.DataFrame(columns = cd.columns)
for style in top_ten_styles:
    df = cd.loc[ cd['Style'] == style ]
    df = df.loc[(np.abs(zscore(df[relevant_columns])) < 1).all(axis=1)]
    ndf = ndf.append(df)

# Submuestreo aleatorio
ndf = ndf.sample(frac = 0.3)


# Graficos de dispersion
#ax = sns.violinplot(x="Style", y="IBU", data=ndf)
#ax = sns.violinplot(x="Style", y="Color", data=ndf)
#ax = sns.violinplot(x="Style", y="ABV", data=ndf)
#plt.xticks(rotation='vertical')


# Datos dispersos 3D
fig2 = plt.figure(2)
ax = fig2.add_subplot(111, projection='3d')

marker = itertools.cycle((',', '+', '.', 'o', '*')) 
for style in top_ten_styles:
    ds = ndf.loc[ ndf['Style'] == style ]
    ax.scatter(ds['Color'], ds['ABV'], ds['IBU'], marker = next(marker))

ax.set_xlabel('Color')
ax.set_ylabel('ABV')
ax.set_zlabel('IBU')


##### Matriz de datos dispersos
fig1 = plt.figure(1)
sns.pairplot(ndf, hue="Style")


plt.show()
