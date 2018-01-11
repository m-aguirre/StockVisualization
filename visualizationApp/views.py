from django.shortcuts import render
from django.http import HttpResponse
import os
import quandl
import pandas as pd

quandl.ApiConfig.api_key = os.environ["quandl_key"]

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
