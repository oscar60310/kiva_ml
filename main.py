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
#df = df[df.sentiment > 0.9978]
print 'Loan less than 1000 ' + str(df.shape)
print 'Founded ' + str(df[df.status == 'funded'].shape)
print 'Fundraising ' + str(df[df.status == 'fundraising'].shape)

for i,j in df.groupby(pd.cut(df["sentiment"], np.arange(0, 1.0, 0.1))):
    funded = len(j[j.status == 'funded'].axes[0])
    fundraising = len(j[j.status == 'fundraising'].axes[0])
    if fundraising != 0:
        print i + ' ' +  str(funded) + '-' + str(fundraising) + ' '+ str(funded * 100 / (funded + fundraising))
    else:
        print i + ' ' +  str(funded) + '-' + str(fundraising)


le = preprocessing.LabelEncoder()
df = df.apply(le.fit_transform)

X = df.drop(['status','id','name','funded_amount','use','post','expire'], 1)
Y = df.status
print X.dtypes
svc = DecisionTreeRegressor(max_depth=10)
rfe = RFE(estimator=svc, n_features_to_select=1, step=1)
rfe.fit(X, Y)

ranking = rfe.ranking_
print ranking