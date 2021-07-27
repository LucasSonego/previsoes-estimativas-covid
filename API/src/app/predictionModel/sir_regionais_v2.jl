# Autor:
# Dr. Rodrigo André Schulz
# rodrigo.schulz@ufpr.br
# http://lattes.cnpq.br/3138448810046000

using Plots
using XLSX
using Dates

function malha(ti,tf)
    #malha
    h=0.01 #tamanho do passo
    n=round(Int32,(tf-ti)/h)
    n=n+1
    return n,h
end

function SIR(t,y) #SIR: S=y[1], I=y[2] e R=y[3]
    return [-alfa*y[1]*y[2]/N, alfa*y[1]*y[2]/N-beta*y[2], beta*y[2]]
end

function RK4(ti,tf,y0,F)
    (n,h)=malha(ti,tf)
    t=zeros(n)
    y=zeros(n,length(y0))
    y[1,:]=y0
    t=[ti:h:tf;]
    for i=2:n
        K1=h*F(t[i-1],y[i-1,:])
        K2=h*F(t[i-1]+h/2,y[i-1,:]+K1/2)
        K3=h*F(t[i-1]+h/2,y[i-1,:]+K2/2)
        K4=h*F(t[i-1]+h,y[i-1,:]+K3)
        y[i,:]=y[i-1,:]+(1.0/6.0)*(K1+(2*K2)+(2*K3)+K4)
    end
    return (t,y)
end

function calibra_alfa_beta(ti,tf,y0,SIR,i1,r1)
    global k=0
    global i=0
    global j = 0
    alfa = alfa0
    beta  = beta0
    (t,y)=RK4(ti,tf,y0,SIR)
    global b0=beta
    global b1=0.9*beta
    global a0=alfa
    global acu0 = (y[n,2]+y[n,3])-(i1+r1) #f(a0)
    global alfa = 0.09*alfa0
    (t,y)=RK4(ti,tf,y0,SIR)
    global a1=alfa
    global acu1 = (y[n,2]+y[n,3])-(i1+r1) #f(a1)
    global z0 = y[n,3]-r1 #g(b0)
    global beta = b1
    (t,y)=RK4(ti,tf,y0,SIR)
    global z1 = y[n,3]-r1 #g(b1)
    global beta = b0
    while i <= numIte
        global a = a1-acu1*(a1-a0)/(acu1-acu0)
        global alfa = a
        (t,y)=RK4(ti,tf,y0,SIR)
        global acu = (y[n,2]+y[n,3])-(i1+r1) #f(a1)
        if abs(acu) < epsilon
            global j=2
            global beta = b0
            (t,y)=RK4(ti,tf,y0,SIR)
            global z0 = y[n,3]-r1 #g(b0)
            global beta = b1
            (t,y)=RK4(ti,tf,y0,SIR)
            global z1 = y[n,3]-r1 #g(b1)
            while j <= numIte
                global b = b1-z1*(b1-b0)/(z1-z0)
                global beta = b
                (t,y)=RK4(ti,tf,y0,SIR)
                global z = y[n,3]-r1
                if  abs(z) < epsilon 
                    global j=numIte
                end
                global j = j+1
                global b0 = b1
                global z0 = z1
                global b1 = b
                global z1 = z
                global k=k+1
                println([k, i, j, a0, a1, acu1, b0, b1, z0, z1])
            end
            global acu = (y[n,2]+y[n,3])-(i1+r1)
            global alfa = a0
            (t,y)=RK4(ti,tf,y0,SIR)
            global acu1 = (y[n,2]+y[n,3])-(i1+r1)
        end
        global i=i+1
        global a0=a1
        global acu0=acu1
        global a1=a
        global acu1=acu
        global k=k+1 
        println([k, i, j, a0, a1, acu0, acu1])
        if abs(acu1) < epsilon
            global alfa = a1
            (t,y)=RK4(ti,tf,y0,SIR)
            global z = y[n,3]-r1
            if abs(z) < epsilon
                break
            end
        end
    end
    return (alfa, beta)
end

function matriz_alfa_beta(num_reg)
    alfa_beta=zeros(num_reg,5)
    for reg=1:num_reg
        global N=sir[reg+1, c_N] #população da regional
        ti=0
        tf=ti+sir[reg+1, c_dt1_dt0]
        y0=[sir[reg+1,c_s0] sir[reg+1,c_i0] sir[reg+1, c_r0]]#dados iniciais
        i1=sir[reg+1, c_i1]
        r1=sir[reg+1, c_r1]
        #println([N reg ti tf y0 i1 r1])
        (alfa,beta)=calibra_alfa_beta(ti,tf,y0,SIR,i1,r1)
        aux1=alfa/beta #R0
        aux2=sir[reg+1,c_perc_obt] #percentual de obitos
        alfa_beta[reg,:]=[reg alfa beta aux1 aux2]
    end
    return alfa_beta 
end

function resultados_3d(temp_prev,num_reg)
    (n,h)=malha(0,temp_prev)
    resultados=zeros(n,6,num_reg)
    for reg=1:num_reg
        global N=sir[reg+1, c_N]
        ti=0
        tf=temp_prev
        y0=[sir[reg+1,c_s1] sir[reg+1,c_i1] sir[reg+1, c_r1]]#dados iniciais
        global alfa=alfa_beta[reg, 2]
        global beta=alfa_beta[reg, 3]
        aux =alfa_beta[reg, 5]
        (resultados[:,1,reg],resultados[:,2:4,reg])=RK4(ti,tf,y0,SIR)
        #separando removidas=recuperados+obitos
        resultados[:,5,reg]=(1-aux)*resultados[:,4,reg] #recuperados
        resultados[:,6,reg]=aux*resultados[:,4,reg]     #óbitos
    end
    return resultados
end

function resultados_diarios(resultados,temp_prev)
    aux1=length(resultados[1,1,:]) #número regiões
    aux2=length(resultados[:,1,1]) #numero de linhas
    aux3=length(resultados[1,:,1]) #numero de colunas
    resultados_diadia=zeros(temp_prev+1,aux3,aux1)
    for i=1:aux1
        cont=0
        for j=1:aux2
            if resultados[j, 1, i]>=cont
                cont=cont+1
                resultados_diadia[cont,:,i]=resultados[j,:,i]
            end
        end
    end
    return resultados_diadia
end

function resultados_aumulados(resultados)
    aux1=length(resultados[1,1,:]) #número registros na planilha sir
    aux2=length(resultados[:,1,1]) #numero de linhas
    aux3=length(resultados[1,:,1]) #numero de colunas
    resultados_acu=zeros(aux2,aux3)
    resultados_acu[:,1]=resultados[:,1,1]
    for i=1:aux1
        resultados_acu[:,2:aux3]=resultados_acu[:,2:aux3]+resultados[:,2:aux3,i]
    end
    return resultados_acu
end

function resultados_diarios_acu(resultados_acu,temp_prev)
    aux2=length(resultados_acu[:,1]) #numero de linhas
    aux3=length(resultados_acu[1,:]) #numero de colunas
    resultados_diadia_acu=zeros(temp_prev+1,aux3)
    cont=0
    for j=1:aux2
        if resultados_acu[j, 1]>=cont
            cont=cont+1
            resultados_diadia_acu[cont,:]=resultados_acu[j,:]
        end
    end
    return resultados_diadia_acu
end


#Ler planilha de dados
xf = XLSX.readxlsx("Dados.xlsx")
sir=xf["sir"]
par=xf["parâmetros"]

#Parâmetros colunas da planilha da dados
    c_local=2; c_N=3; c_dt0=10; c_s0=11; c_i0=12; c_r0=13;	c_dt1=14; c_s1=15; c_i1=16; c_r1=17; c_dt1_dt0=18; c_perc_obt=19
    temp_prev=par[1,2] #tamanho da previsão (em dias)
    num_reg=par[2,2] #número de registros

#parametros SIR
    alfa0=par[3,2]
    beta0=par[4,2]
    alfa=alfa0
    beta=beta0
#precisão calibra_alfa_beta
    numIte=par[5,2]
    epsilon= par[6,2]

#argumentos calibra_alfa_beta
#reg=1
ti=0
tf=sir[2,c_dt1_dt0]
(n,h)=malha(ti,tf)
alfa_beta=matriz_alfa_beta(num_reg) #[regional, alfa, beta, R0]
resultados=resultados_3d(temp_prev,num_reg) #matriz 3d. Para cada regional: [t, S, I, Removidos, Recuperados, Obitos]
resultados_diadia=round.(Int, resultados_diarios(resultados,temp_prev))
resultados_acu=resultados_aumulados(resultados)
resultados_diadia_acu=round.(Int, resultados_diarios_acu(resultados_acu,temp_prev))

#gráficos
# pyplot()
# theme(:default)
#registros
# for reg=1:num_reg
#     #p=plot(resultados[:,1,reg],[resultados[:, 2, reg] resultados[:, 3, reg] resultados[:, 5, reg] resultados[:, 6, reg]], #com suscetíveis
#     p=plot(resultados[:,1,reg],[                      resultados[:, 3, reg] resultados[:, 5, reg] resultados[:, 6, reg]], #sem suscetíveis
#     title  = "Previsão: $(sir[reg+1,c_local])",
#     xlabel = "Dias a partir de $(sir[reg+1, c_dt1])",
#     ylabel = "Indivíduos",
#     #label  = ["suscetíveis" "infectados" "recuperados" "óbitos"] #com suscetíveis
#     label  = [              "infectados" "recuperados" "óbitos"] #sem suscetíveis
#     )
#     savefig(p,"$(sir[reg+1,c_local])")
# end
#acumulado
#p=plot(resultados_acu[:,1],[resultados_acu[:, 2] resultados_acu[:, 3] resultados_acu[:, 5] resultados_acu[:, 6]], #com suscetíveis
# p=plot(resultados_acu[:,1], [                    resultados_acu[:, 3] resultados_acu[:, 5] resultados_acu[:, 6]], #sem suscetíveis
# title  = "Previsão: acumulados",
#     xlabel = "Dias a partir de $(sir[3, c_dt1])",
#     ylabel = "Indivíduos",
#     #label  = ["suscetíveis" "infectados" "recuperados" "óbitos"] #com suscetíveis
#     label  = [              "infectados" "recuperados" "óbitos"] #sem suscetíveis
#     )
# savefig(p,"acumulados")

# XLSX.sheetnames(xf) #não sei se preciso disso aqui!

XLSX.openxlsx("Resultados.xlsx", mode="w") do xf
    R0 = xf[1]
    XLSX.rename!(R0, "R0")
    R0[1,1] = "Índice"
    R0[1,2] = "Local"
    R0[1,3] = "alfa"
    R0[1,4] = "beta"
    R0[1,5] = "R0"
    R0[1,6] = "Taxa Óbitos"
    for reg=1:num_reg
        R0[reg+1,1] = alfa_beta[reg,1]
        R0[reg+1,2] = sir[reg+1,2]
        R0[reg+1,3:6] = alfa_beta[reg,2:5]
    end
    ######
    aux1=length(resultados_diadia[:,1,1])#linhas
    aux2=length(resultados_diadia[1,:,1])#colunas
    aux3=length(resultados_diadia[1,1,:])#regionais
    for reg=1:aux3
        XLSX.addsheet!(xf, "$(sir[reg+1,2])")
        sheet = xf[reg+1]
        sheet[1,1] = "Data"
        sheet[1,2] = "Suscetíveis"
        sheet[1,3] = "Infectados"
        sheet[1,4] = "Removidos"
        sheet[1,5] = "Recuperados"
        sheet[1,6] = "Óbitos"
        for i=1:aux1
            sheet[i+1,1] = sir[reg+1,c_dt1]+ Dates.Day(resultados_diadia[i,1,reg])
            sheet[i+1,2:aux2] = resultados_diadia[i,2:aux2,reg]
        end
    end
    ############################################
    aux1=length(resultados_diadia_acu[:,1])#linhas
    aux2=length(resultados_diadia_acu[1,:])#colunas
    XLSX.addsheet!(xf, "acumulados")
    sheet = xf[num_reg+2]
    sheet[1,1] = "Data"
    sheet[1,2] = "Suscetíveis"
    sheet[1,3] = "Infectados"
    sheet[1,4] = "Removidos"
    sheet[1,5] = "Recuperados"
    sheet[1,6] = "Óbitos"
    for i=1:aux1
        sheet[i+1,1] = sir[num_reg+1,c_dt1]+ Dates.Day(resultados_diadia_acu[i,1])
        sheet[i+1,2:aux2] = resultados_diadia_acu[i,2:aux2]
    end
end


##################################################
#(Date(2014,1,29)+Dates.Day(1)) + Dates.Month(1)
#Date(2014,1,29)+Dates.Day(<quantidadeDeDias>)
