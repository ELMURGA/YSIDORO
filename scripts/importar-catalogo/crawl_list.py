import re, json, sys
from concurrent.futures import ThreadPoolExecutor
from lib import *
o=opener()
home=get(o,BASE+'cpweb')
# sections with names
secs={}
for m in re.finditer(r'cpweb\?s=(\d+)&seccion=([^"]+)"',home):
    secs[m.group(1)]=html.unescape(m.group(2)).strip()
print(len(secs),'sections')
json.dump(secs,open('sections.json','w'),ensure_ascii=False)
def do(item):
    s,name=item
    oo=opener(); get(oo,BASE+'cpweb')
    prods=[]; p=1; total=1
    while True:
        h=get(oo,BASE+f'cpweb?s={s}&pagina={p}&seccion='+urllib.parse.quote(name))
        if h is None: print('FAIL',s,p,flush=True); break
        items=parse_list(h)
        for it in items: it['s']=s
        prods+=items
        pages=[int(x) for x in re.findall(r'name="pagina" value="(\d+)"',h)]
        mx=max(pages) if pages else 1
        if p>=mx or not items: break
        p+=1
    print(s,name,len(prods),flush=True)
    return s,prods
with ThreadPoolExecutor(5) as ex:
    res=dict(ex.map(do,secs.items()))
json.dump(res,open('lists.json','w'),ensure_ascii=False)
allp={}
for s,ps in res.items():
    for p in ps: allp.setdefault(p['sa'],p).setdefault('secs',[]).append(s) if False else None
print('unique',len({p['sa'] for ps in res.values() for p in ps}),'total rows',sum(len(v) for v in res.values()))
