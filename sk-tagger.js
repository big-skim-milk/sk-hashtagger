export function tagger(element, options, callback) {
    let el = () => {
        if (!Array.isArray(element)) {
            if (typeof element === 'string') return !element.includes('#') ? $w(`#${element}`) : $w(`${element}`);
            else if (typeof element === 'object') return element;
        } else {
            return element.map(f => {
                if (typeof f === 'string') return !f.includes('#') ? $w(`#${f}`) : $w(`${f}`);
                else if (typeof f === 'object') return f;
            });
        }
    };
    if ((!Array.isArray(el()) && el().type !== '$w.Text') || (Array.isArray(el()) && el()[0].type !== '$w.Text')) console.error('sk-tagger: ' + el().id + ' is not a text element.');
    if (!options.delimiter) options.delimiter = ', ';
    options.tags = Array.isArray(options.tags) ? options.tags.join(options.delimiter) : options.tags;
    if (options.href) options.href = Array.isArray(options.href) ? options.href : options.href.split(options.delimiter);
    setTimeout(() => !Array.isArray(el()) ? tak(el()) : el().forEach(e => tak(e)), 1);

    function tak(txt) {
        let sum = 0,
            str = '',
            tags = [],
            data = options.tags.split(options.delimiter).map(d => { return { k: function() { return Math.round(this.t.length * ((options.font_size + options.whitespace) * options.ratio * 0.49)) }, t: `${options.symbol ? '#' : ''}${d}` }; });
        data.forEach((im, ix) => {
            str += options.href ? `${options.format_tag ? '<span style=' + options.format_tag + '>' : ''}<a href=${options.href[ix]} ${options.target ? 'target=' + options.target : ''}>${im.t}</a>${options.format_tag ? '</span>' : ''}${'&nbsp;'.repeat(options.whitespace)}` : `${options.format_tag ? '<span style=' + options.format_tag + '>' : ''}${im.t}${options.format_tag ? '</span>' : ''}${'&nbsp;'.repeat(options.whitespace)}`;
            tags.push({ ln: im.k() + options.font_size });
            if (ix === data.length - 1) {
                tags.forEach((it, ind) => {
                    sum += it.ln;
                    it.loc = sum;
                    if (ind === tags.length - 1) {
                        txt.html = txt.html.replace(txt.html.replace(/<[^>]*>?/gm, ""), `<span style=${"font-size:" + options.font_size + "px;" + options.format_all}>${str}</span>`);
                        txt.onClick(ev => {
                            if (callback) {
                                let j = 0;
                                tags.forEach((i, ii) => {
                                    j += ev.offsetX > i.loc ? 1 : 0;
                                    if (ii === tags.length - 1 && data[j]) callback(data[j].t);
                                });
                            }
                        });
                    }
                });
            }
        });
    }
}
