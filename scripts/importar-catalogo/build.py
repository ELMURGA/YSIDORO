import json,re
P=json.load(open('prods.json')); D=json.load(open('details.json')); T=json.load(open('tree.json')); S=json.load(open('sections.json'))
def num(x):
    try: return round(float(str(x).replace(',','.')),2)
    except: return None
sec_tops={}   # section id -> list of top names
for t in T:
    for g in t['groups']:
        for it in g['items']:
            sec_tops.setdefault(it['s'],[])
            if t['name'] not in sec_tops[it['s']]: sec_tops[it['s']].append(t['name'])
def secname(s): return S.get(s,s)
out=[]
for sa,p in P.items():
    d=D.get(sa) or {}
    unit=num(d.get('priceIva')) or num(p['priceIva'])
    lst=num(p['priceIva'])
    net=num(d.get('price')) or num(p['price'])
    desc=re.sub(r'\s+',' ',(d.get('desc') or '')).strip(' /').strip()
    name=re.sub(r'\s+',' ',d.get('name') or p['name']).strip()
    secs=[]; tops=[]
    for s in p['secs']:
        n=secname(s)
        if n not in secs: secs.append(n)
        for tp in sec_tops.get(s,[]):
            if tp not in tops: tops.append(tp)
    stock='in-stock' if (p['stock']=='EN STOCK' or d.get('stockDetail')=='STOCK DISPONIBLE') else 'out-of-stock'
    r={'id':sa,'name':name,'ref':p['ref'],'price':unit,'cat':secs,'top':tops,'img':p['img'],'stock':stock,'desc':desc}
    if p['desde'] and lst and unit and lst<unit: r['from']=lst
    if net: r['net']=net
    if p['iva']: r['vat']=int(float(p['iva']))
    out.append(r)
missing=[r['id'] for r in out if r['price'] is None]
print('products',len(out),'noprice',len(missing),'nodesc',sum(1 for r in out if not r['desc']),'notin D',sum(1 for r in out if r['id'] not in D))
json.dump(out,open('catalog.json','w'),ensure_ascii=False,separators=(',',':'))
import os;print(os.path.getsize('catalog.json')/1e6,'MB')
