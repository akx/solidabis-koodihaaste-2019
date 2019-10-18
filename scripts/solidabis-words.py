from collections import Counter
import json

with open('finnish-words.txt', 'r') as infp:
    words = {w.lower() for w in infp.read().replace(' · ', '\n').splitlines()}

def xx():

    cnt_t = Counter()
    nw = 0

    for w in words:
        cnt = Counter(w)
        t = sum(cnt.values())
        cnt = {ch: n / t for (ch, n) in cnt.items()}
        nw += 1
        cnt_t += cnt

    fi_dist = {ch: round(n / nw, 4) for (ch, n) in cnt_t.items()}
    print(fi_dist)

keys = set('abcdefghijklmnopqrstuvwxyzåäö')


def digrax():
    grams = Counter()
    for gram_len in (3, 4, 5):
        for w in words:
            for i in range(len(w) - gram_len + 1):
                gram = w[i : i + gram_len].lower()
                if set(gram) <= keys:
                    grams[gram] += 1
    gx = grams.most_common(300)
    gx_total = sum(n for (g, n) in gx)
    gx_distr = {g: int((n / gx_total) * 10000) for (g, n) in gx}
    print(json.dumps(sorted(gx_distr.keys()), ensure_ascii=False))

digrax()
