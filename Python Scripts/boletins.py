from datetime import date
import pandas as pd
import mysql.connector
from config import *

dataAtual = "01_06_2021"
# dataAtual = date.today().strftime("%d_%m_%Y")

url = 'https://www.saude.pr.gov.br/sites/default/arquivos_restritos/files/documento/2021-'+ \
      dataAtual.split("_")[1]+ '/informe_epidemiologico_'+dataAtual+'_obitos_casos_municipio.csv'

#URL Teste (estatica)
# url = 'https://www.saude.pr.gov.br/sites/default/arquivos_restritos/files/documento/2021-03/informe_epidemiologico_22_03_2021_obitos_casos_municipio.csv'

arquivoCSV = pd.read_csv(url,sep=';')
# print(arquivoCSV)

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
    dados = (row[MUNICIPIO], int(row[CASOS]), int(row[OBITOS]), int(row[RECUPERADOS]), int(row[INVESTIGACAO]), dataAtual)
    try:
        cursor.execute("INSERT INTO boletins (Municipio, Casos, Obitos, Recuperados, Investigacao, Dia) VALUES (%s,%s,%s,%s,%s,%s);", dados)
    except:
        print(dados)
cnx.commit()

cursor.close()
cnx.close()
