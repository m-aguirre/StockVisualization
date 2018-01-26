from django.shortcuts import render
from django.http import HttpResponse
import os
import quandl
import pandas as pd

#Uncomment for use on local development server
#from stockvisual.private_keys import quandl_key
#quandl.ApiConfig.api_key = quandl_key

quandl.ApiConfig.api_key = os.environ["quandl_key"]

def index(request):
    return render(request, '../templates/index.html')

def sendResponse(request):
    symbol = request.path.split('/')[2]
    search_param = "WIKI/" + symbol
    try:
        df = quandl.get(search_param)
        data = df.reset_index().to_json(orient="records")
    except:
        data = 'NOT FOUND'

    return HttpResponse(data)
