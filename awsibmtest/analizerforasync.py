#Script para automatizar el proceso de análisis de documentos usando el api de textrack de aws

import time
import boto3
import os

client = boto3.client('textract')
s3 = boto3.resource('s3')

def writeinfile(file, NextToken):
	if not os.path.exists(file):
		os.system (f'''touch {file}''')
	archivo_log = open(file, "a+")
	archivo_log.write(NextToken + "\n")
	archivo_log.close()

def asyncconsultor(pjobid=None, Token=None, file=None, firstpjobid=None):
	time.sleep(2)
	if firstpjobid:
		print('first jobid')
		response = client.get_document_analysis( JobId=pjobid, MaxResults=1000 )
	if Token:
		print(f'''new token{Token}''')
		response = client.get_document_analysis( JobId=pjobid, MaxResults=1000, NextToken=Token )
	newresponse   = f'''{response}'''
	newToken  = newresponse.split(',')[2].split(':')[1][2:-1] 
	writeinfile(f'out{file}.txt', newresponse)
	writeinfile(f'tokens{file}.txt', newToken)
	asyncconsultor(pjobid=pjobid, Token=newToken, file=file)

def asyncput(file, bucket):
	crt = 'CRT' + file.split('.')[0]
	jt= 'jT' + file.split('.')[0]
	response = client.start_document_analysis(
	    DocumentLocation={
	        'S3Object': {
	            'Bucket': bucket,
	            'Name': file,
	        }
	    },
	    FeatureTypes=['TABLES','FORMS'],
	    ClientRequestToken= crt,
    	JobTag= jt,
	)
	print(response)
	return response

def uploadfiletos3(file, bucket):
	data = open(file, 'rb')
	s3.Bucket(bucket).put_object(Key=file, Body=data)

file = input('ingrese el nombre del fichero para procesar con textract: ')
uploadfiletos3(file,'licimatictextracttest')
rap = f'''{asyncput(file, 'licimatictextracttest')}'''
JobId = rap.split(',')[0].split(':')[1][2:-1] 
asyncconsultor(pjobid=JobId, file=file, firstpjobid=True)

