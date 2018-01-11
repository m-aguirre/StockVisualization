from django.shortcuts import render
from django.http import HttpResponse
import quandl
import pandas as pd


def index(request):
    return render(request, '../templates/index.html')

def sendResponse(request):
    data = "Response from Serverrrrr"
    try:
        df = quandl.get("WIKI/FB")
        data = df.reset_index().to_json(orient="records")
    except:
        data = 'NOT FOUND'

    return HttpResponse(data)


def getQuandlData():
    data = quandl.get('WIKI/AAPL')
    print('Quandl data requested')
    return data
