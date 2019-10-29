export function tagger(element, options, callback) {
 if (element.type !== "$w.Text") console.error("SK_Tagger:" + element.id + " is not a Text element.");
 else {
  setTimeout(function () {
   let sum = 0,
    str = '',
    tags = [],
    data = options.tags.split(options.delimiter).map(d => { return { k: function () { return Math.round(this.t.length * ((options.font_size + options.whitespace) * options.ratio * 0.49)) }, t: `${options.symbol ? '#' : ''}${d}` }; });
  data.forEach((im, ix, arr) => {
   str += options.href ? '<a href="' + options.href[ix] + (options.target ? '" target="' + options.target + '"': '') + `>${im.t}</a>${'&nbsp;'.repeat(options.whitespace)}` : `${im.t}${'&nbsp;'.repeat(options.whitespace)}`;
   tags.push({ ln: im.k() + options.font_size });
   if (ix === data.length - 1) {
     tags.forEach((it, ind) => {
       sum += it.ln;
       it.loc = sum;
       if (ind === tags.length - 1) {
        element.html = element.html.replace(element.html.replace(/<[^>]*>?/gm, ""), `<span style=${"font-size:" + options.font_size + "px;" + options.formatting}>${str}</span>`);
        element.onClick(ev => {
         if (callback) {
           let j = 0;
           tags.forEach((i, ii, iii) => {
             j += ev.offsetX > i.loc ? 1 : 0;
             if (ii === iii.length - 1 && data[j]) callback(data[j].t);
           });
         }
        });
       }
      });
     }
    });
   }, 1);
  }
}
