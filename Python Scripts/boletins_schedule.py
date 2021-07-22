import schedule
import time
from datetime import date
import pandas as pd
import mysql.connector

from config import *

def buscar_boletim():
    data_atual = date.today().strftime("%d_%m_%Y")

    url = 'https://www.saude.pr.gov.br/sites/default/arquivos_restritos/files/documento/'\
          + data_atual.split("_")[2]+ '-' + data_atual.split("_")[1]+ '/informe_epidemiologico_'\
          + data_atual + '_obitos_casos_municipio.csv'

    try:
        arquivoCSV = pd.read_csv(url,sep=';')

        cnx = mysql.connector.connect(**config)

        cursor = cnx.cursor()

        # colunas
        MUNICIPIO = 3
        CASOS = 4
        OBITOS = 5
        RECUPERADOS = 6
        INVESTIGACAO = 7

        for row in arquivoCSV.values:
            dados = (row[MUNICIPIO], int(row[CASOS]), int(row[OBITOS]), int(row[RECUPERADOS]), int(row[INVESTIGACAO]), data_atual)
            try:
                cursor.execute("INSERT INTO boletins (Municipio, Casos, Obitos, Recuperados, Investigacao, Dia) VALUES (%s,%s,%s,%s,%s,%s);", dados)
            except:
                print("problema com a inserção dos dados do dia " + data_atual)
        cnx.commit()

        cursor.close()
        cnx.close()
    except:
        print("Não há boletim para o dia " + data_atual)

schedule.every().day.at("18:06").do(buscar_boletim)

while True:
    schedule.run_pending()
    time.sleep(60)