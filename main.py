import numpy as np
import pandas as pd
from sklearn.svm import SVC
from sklearn.datasets import load_digits
from sklearn.feature_selection import RFE
import matplotlib.pyplot as plt
from sklearn.tree import DecisionTreeRegressor
from sklearn import preprocessing

input_file = "dataimg.csv"
df = pd.read_csv(input_file, header = 0)
print 'Origin size ' + str(df.shape)
df = df.dropna(axis=0, how='any')
print 'After drop Na ' + str(df.shape)
df = df[df.loan_amount < 1000]
print 'Loan less than 1000 ' + str(df.shape)
print 'Founded ' + str(df[df.status == 'funded'].shape)
print 'Fundraising ' + str(df[df.status == 'fundraising'].shape)

le = preprocessing.LabelEncoder()
df = df.apply(le.fit_transform)

X = df.drop(['status','id','name','funded_amount','use','post','expire'], 1)
Y = df.status
print X.dtypes
svc = DecisionTreeRegressor(max_depth=5)
rfe = RFE(estimator=svc, n_features_to_select=1, step=1)
rfe.fit(X, Y)

ranking = rfe.ranking_
print ranking