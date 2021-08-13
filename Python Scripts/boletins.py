from datetime import date
import pandas as pd
import mysql.connector
from config import *

dataAtual = "01_06_2021"
# dataAtual = date.today().strftime("%d_%m_%Y")

try:
    url = 'https://www.saude.pr.gov.br/sites/default/arquivos_restritos/files/documento/' + \
          data_atual.split("_")[2] + '-' + data_atual.split("_")[1] + '/informe_epidemiologico_' + \
          data_atual + '_obitos_casos_municipio.csv'

    arquivoCSV = pd.read_csv(url, sep=';')

except:
    url = 'https://www.saude.pr.gov.br/sites/default/arquivos_restritos/files/documento/' + \
          data_atual.split("_")[2] + '-' + data_atual.split("_")[1] + '/INFORME_EPIDEMIOLOGICO_' + \
          data_atual + '_OBITOS_CASOS_Municipio.csv'

    arquivoCSV = pd.read_csv(url, sep=';')

#URL Teste (estatica)
# url = 'https://www.saude.pr.gov.br/sites/default/arquivos_restritos/files/documento/2021-03/informe_epidemiologico_22_03_2021_obitos_casos_municipio.csv'

cnx = mysql.connector.connect(**config)

cursor = cnx.cursor()

# colunas
MUNICIPIO = 3
CASOS = 4
OBITOS = 5
RECUPERADOS = 6
INVESTIGACAO = 7

for row in arquivoCSV.values:
#   print(row)
    dados = (row[MUNICIPIO], int(row[CASOS]), int(row[OBITOS]), int(row[RECUPERADOS]), int(row[INVESTIGACAO]), data_atual)
    try:
        cursor.execute("INSERT INTO boletins (Municipio, Casos, Obitos, Recuperados, Investigacao, Dia) VALUES (%s,%s,%s,%s,%s,%s);", dados)
    except:
        print(dados)
cnx.commit()

cursor.close()
cnx.close()
