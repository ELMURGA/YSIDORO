import re, html, urllib.request, urllib.parse, http.cookiejar, time
BASE='http://ipapel.es/isidoro/'
def opener():
    cj=http.cookiejar.CookieJar()
    o=urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cj))
    o.addheaders=[('User-Agent','Mozilla/5.0')]
    return o
def get(o,url,tries=4):
    for i in range(tries):
        try:
            with o.open(url,timeout=40) as r:
                return r.read().decode('latin1')
        except Exception as e:
            time.sleep(1+i*2)
    return None
def clean(s):
    s=re.sub(r'<[^>]+>',' ',s); s=html.unescape(s)
    return re.sub(r'\s+',' ',s).strip()
def parse_list(h):
    out=[]
    for blk in re.split(r'<div id="newart"\s',h)[1:]:
        m=re.search(r'name="sa" value="(\d+)"',blk)
        if not m: continue
        sa=m.group(1)
        name=clean(re.search(r'<font color="#666666">(.*?)</font>',blk,re.S).group(1)) if re.search(r'<font color="#666666">(.*?)</font>',blk,re.S) else ''
        ref=re.search(r'Referencia:(?:&nbsp;)*\s*([^<\s]+)',blk)
        img=re.search(r'class="zoom"\s+src="\.\./ISI/WEB_IMG_SHOP/([^"]+)"',blk)
        pm=re.search(r'<b>\s*([\d.,]+)</b></font></label><label class="fn_18b"',blk)
        iva=re.search(r'Precio IVA incl\.:\s*([\d.,]+)',blk)
        desde='Precio Desde' in blk
        stock=re.search(r'<label class="fa_14b"[^>]*>(.*?)</label>',blk)
        porc=re.search(r'name="porc_iva" value="([\d.,]*)"',blk)
        out.append(dict(sa=sa,name=name,ref=ref.group(1) if ref else '',img=img.group(1) if img else '',
            price=pm.group(1) if pm else '',priceIva=iva.group(1) if iva else '',desde=desde,
            stock=clean(stock.group(1)) if stock else '',iva=porc.group(1) if porc else ''))
    return out

def fetch_detail(o,sa):
    url=BASE+f'cpweb_shop_artdesc?sl=&sa={sa}&c=1&dto=&porc_iva=21&prc=&t=&d=&x=&o=1&s=&busc='
    for i in range(4):
        h=get(o,url)
        if h and len(h)>5000: return h
        time.sleep(0.5)
    return None
def parse_detail(h):
    i=h.find('id="cont_art2"')
    seg=h[i:i+20000] if i>=0 else h
    j=seg.find('id="newart"'); 
    if j>0: seg=seg[:j]
    t=re.search(r'class="frs_24b"[^>]*>(.*?)</label>',seg,re.S)
    d=seg.find('Descripcion:')
    desc=''
    if d>=0:
        rest=seg[d:]
        parts=re.findall(r'<label class="frs_12b">(.*?)</label>',rest,re.S)
        desc=' '.join(clean(p) for p in parts)
    pr=re.search(r'Precio:\s*<font[^>]*>\s*([\d.,]+)',seg)
    iva=re.search(r'Precio IVA incl\.:\s*([\d.,]+)',seg)
    st=re.search(r'class="frs_24b"[^>]*><font[^>]*><b>(?:&nbsp;)*(.*?)</b>',seg,re.S)
    return dict(name=clean(t.group(1)) if t else '',desc=desc,price=pr.group(1) if pr else '',priceIva=iva.group(1) if iva else '',stockDetail=clean(st.group(1)) if st else '',raw_desc_len=len(desc))
