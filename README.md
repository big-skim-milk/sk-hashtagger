# sk-hashtagger
A tiny utility to reduce collection/database size and turn single wix text elements into functional hashtags.


SETUP

Simply copy paste the tagger.js file into a new Public file and name it 'sk-tagger'.


USAGE

The function takes three arguments: element, options, and callback.

Callback returns tag clicked as a string, and for now, element requires the $w wrapper syntax.

Here is a typical example:

import { tagger } from 'public/sk-tagger.js';

$w.onReady(function() {
  $w('#dynamicDataset').onReady(function() {
    tagger($w('#text1'), {
      tags: $w('#dynamicDataset').getCurrentItem().hashtags,
      font_size: 18,
      ratio: 1.3,
      delimiter: ', '
    }, (tag) => console.log(tag));
  });
});


OPTIONS (in order of importance)
.tags: string -
  Required. Property you pass your tags to. Currently supports only strings. A typical collection field value:
  "Science, Big Data, Lizard People"
  
  Or you can use a static value if you're boring.

.font_size: number -
  Optional. Only supports px values currently.
  
.ratio: number -
  Required. As far as I know, there's no native way to detect font scaling/properties in Wix so this option is required. Try values between 1 and 2.5 and test using the console.log(tag) callback above for your particular font.
  
.delimiter: string - 
  Required. Added in case your values are not comma separated.
  
.whitespace: number -
  Optional. Inserts n number of non-breaking spaces between tags.
  
.formatting: string -
  Optional. Adds inline CSS properties to the html string.
  
.href: array -
  Optional. You can use wixLocation.to() in your callback if you want, but an href will be better for accessibility.
  
.target: string -
  Optional. Target for your href link. Assumes all your hrefs will point to the same target.
  
.symbol: boolean -
  Optional. If set to true, your tags will be displayed and returned with a prepended # symbol.
