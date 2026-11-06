import json, threading
from concurrent.futures import ThreadPoolExecutor
from lib import *
lists=json.load(open('lists.json'))
prods={}
for s,ps in lists.items():
    for p in ps:
        if p['sa'] not in prods: prods[p['sa']]=dict(p,secs=[])
        prods[p['sa']]['secs'].append(s)
json.dump(prods,open('prods.json','w'),ensure_ascii=False)
import os
try: prev=json.load(open('details.json'))
except Exception: prev={}
prev={k:v for k,v in prev.items() if v}
ids=[i for i in sorted(prods) if i not in prev]
print('todo',len(ids),flush=True)
tl=threading.local(); out=dict(prev); done=[0]; lock=threading.Lock()
def work(sa):
    if not hasattr(tl,'o'):
        tl.o=opener(); get(tl.o,BASE+'cpweb')
    h=fetch_detail(tl.o,sa)
    if h is None:
        tl.o=opener(); get(tl.o,BASE+'cpweb'); h=fetch_detail(tl.o,sa)
    out[sa]=parse_detail(h) if h else None
    done[0]+=1
    if done[0]%200==0:
        with lock:
            print(done[0],flush=True); json.dump(dict(out),open('d.tmp','w'),ensure_ascii=False); os.replace('d.tmp','details.json')
with ThreadPoolExecutor(10) as ex: list(ex.map(work,ids))
json.dump(out,open('details.json','w'),ensure_ascii=False)
print('DONE',len(out),sum(1 for v in out.values() if v is None))
