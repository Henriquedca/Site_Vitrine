"""Logo U (ligature HA, fond brun, trait brique) : géométrie de la planche Moda (128 px) agrandie x8 (1024 px).
Produit le SVG du site et le markup Moda."""
D = './'  # dossier de sortie
BROWN, CREAM, BRICK = '#241C17', '#FFFDF9', '#E0866B'
S = 8  # 128 -> 1024

def r(v): return round(v * S, 1)

# Formes, en coordonnées de la case 128 px (identiques à la piste U de la planche).
H_PARTS = [(28, 30, 14, 60), (58, 30, 14, 60), (28, 54, 44, 12)]          # jambage gauche, jambage partagé, barre du H
A_DIAG = [(58, 30), (72, 30), (102, 90), (88, 90)]                        # jambe oblique du A
A_BAR = (72, 66, 10, 9)                                                   # barre du A
TRAIT = (36, 102, 56, 7)

def svg(radius=224, size=1024):
    rects_h = ''.join(f'<rect x="{r(x)}" y="{r(y)}" width="{r(w)}" height="{r(h)}" fill="{CREAM}"/>' for x, y, w, h in H_PARTS)
    diag = 'M' + ' L'.join(f'{r(x)} {r(y)}' for x, y in A_DIAG) + ' Z'
    ax, ay, aw, ah = A_BAR
    tx, ty, tw, th = TRAIT
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="{size}" height="{size}">'
            f'<rect width="1024" height="1024" rx="{radius}" fill="{BROWN}"/>{rects_h}'
            f'<path d="{diag}" fill="{BRICK}"/>'
            f'<rect x="{r(ax)}" y="{r(ay)}" width="{r(aw)}" height="{r(ah)}" fill="{BRICK}"/>'
            f'<rect x="{r(tx)}" y="{r(ty)}" width="{r(tw)}" height="{r(th)}" rx="{r(th) / 2}" fill="{BRICK}"/></svg>')

def moda():
    rects_h = ''.join(f'<rectangle name="H" x="{r(x)}" y="{r(y)}" width="{r(w)}" height="{r(h)}" fill="{CREAM}"/>' for x, y, w, h in H_PARTS)
    diag = 'M ' + ' L '.join(f'{r(x)} {r(y)}' for x, y in A_DIAG) + ' Z'
    ax, ay, aw, ah = A_BAR
    tx, ty, tw, th = TRAIT
    return (f'<content><background fill="#F7F2EB"/><rectangle name="Fond" x="0" y="0" width="1024" height="1024" corner-radius="224" fill="{BROWN}"/>'
            f'{rects_h}<path name="Jambe du A" d="{diag}" fill="{BRICK}"/>'
            f'<rectangle name="Barre du A" x="{r(ax)}" y="{r(ay)}" width="{r(aw)}" height="{r(ah)}" fill="{BRICK}"/>'
            f'<rectangle name="Trait" x="{r(tx)}" y="{r(ty)}" width="{r(tw)}" height="{r(th)}" corner-radius="full" fill="{BRICK}"/></content>')

open(D + 'logo-u.svg', 'w').write(svg())                 # coins arrondis (site, favicon)
open(D + 'logo-u-plein.svg', 'w').write(svg(radius=0))   # carré plein (icône iPhone : iOS arrondit lui-même)
open(D + 'logo-u.xml', 'w').write(moda())
print(open(D + 'logo-u.svg').read())
