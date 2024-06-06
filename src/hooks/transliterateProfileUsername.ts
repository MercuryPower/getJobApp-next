export const transliterateProfileUsername = (text: string | undefined): string => {
    if(!text)
    {
        return '';
    }
    const ru = 'А-а-Б-б-В-в-Г-г-Д-д-Е-е-Ё-ё-Ж-ж-З-з-И-и-Й-й-К-к-Л-л-М-м-Н-н-О-о-П-п-Р-р-С-с-Т-т-У-у-Ф-ф-Х-х-Ц-ц-Ч-ч-Ш-ш-Щ-щ-Ъ-ъ-Ы-ы-Ь-ь-Э-э-Ю-ю-Я-я'.split('-');
    const en = 'A-a-B-b-V-v-G-g-D-d-E-e-E-yo-Zh-zh-Z-z-I-i-Y-y-K-k-L-l-M-m-N-n-O-o-P-p-R-r-S-s-T-t-U-u-F-f-Kh-kh-Ts-ts-Ch-ch-Sh-sh-Shch-shch--Y-y--e-Yu-yu-Ya-ya'.split('-');
    let result = '';
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const index = ru.indexOf(char);
        if (index >= 0) {
            result += en[index];
        } else {
            result += char;
        }
    }
    return result.replace(/\s/g, '');
};