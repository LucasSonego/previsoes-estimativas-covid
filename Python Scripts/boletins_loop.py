from datetime import date
import pandas as pd
import mysql.connector
from config import *

dia = 1
while dia <= 31:
    strdia = "";
    if dia < 10:
        strdia = "0" + str(dia)
    else:
        strdia = str(dia)

    dataAtual = strdia + "_04_2021"

    url = 'https://www.saude.pr.gov.br/sites/default/arquivos_restritos/files/documento/2021-'+ \
          dataAtual.split("_")[1]+ '/informe_epidemiologico_'+dataAtual+'_obitos_casos_municipio.csv'

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
        #   print(row)
            dados = (row[MUNICIPIO], int(row[CASOS]), int(row[OBITOS]), int(row[RECUPERADOS]), int(row[INVESTIGACAO]), dataAtual)
            try:
                cursor.execute("INSERT INTO boletins (Municipio, Casos, Obitos, Recuperados, Investigacao, Dia) VALUES (%s,%s,%s,%s,%s,%s);", dados)
            except:
                print("problema com a inserção dos dados do dia " + strdia)
        cnx.commit()

        cursor.close()
        cnx.close()
    except:
        print("Não há boletim para o dia " + strdia)

    dia += 1