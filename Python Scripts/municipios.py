import pandas as pd
import mysql.connector
from config import *

arquivoCSV = pd.read_csv("./populacao.csv",sep=',')
# print(arquivoCSV)

cnx = mysql.connector.connect(**config)

cursor = cnx.cursor()

# colunas
NOME = 0
POPULACAO = 1

id = 0
for row in arquivoCSV.values:
    id += 1
    # print(row[0])
    # print(row[1])
    dados = (id, row[NOME], row[POPULACAO])
    cursor.execute("INSERT INTO municipios (id, nome, populacao) VALUES (%s,%s,%s);", dados)

cnx.commit()

cursor.close()
cnx.close()
