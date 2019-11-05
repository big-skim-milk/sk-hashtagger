# sk-hashtagger v0.2
A tiny utility to reduce collection/database size and turn single wix text elements into functional hashtags.


**v0.2 updates**

**--** .tags property now accepts strings and arrays.

**--** .href property now accepts strings and arrays.

**--** Split .formatting property into .format_all and .format_tag for more granular control of styling

**--** .delimiter property now has default: ', '


## SETUP

Simply copy paste the tagger.js file into a new Public file and name it **'sk-tagger'**.



## USAGE

The function takes three arguments: *element*, *options*, and *callback*.

Callback returns tag clicked as a string. *element* can be $w() object, string, or array of either.


**Import statement:**

import { tagger } from 'public/sk-tagger.js';


**A typical example:**

  	tagger(['text7'], {
		tags: $w('#dynamicDataset').getCurrentItem().tags,
		font_size: 18,
		ratio: 1.6,
		symbol: false,
		delimiter: ', ',
		whitespace: 2,
		format_all: `color:#fff;`,
		format_tag: `background-color:#000;
			padding-top:3px;
			padding-bottom:3px;
			padding-right:6px;
			padding-left:6px;
			border-radius:3px;`,
		href: ['https://duck.com', 'https://startpage.com', 'https://quant.com'],
		target: '_blank',
	}, tag => console.log(tag));



## OPTIONS (in order of importance)


**.tags: string/array** -
  Required. Property you pass your tags to. A typical collection field value:
  "Science, Big Data, Lizard People"
  

**.font_size: number** -
  Optional. Only supports px values currently.
  
  
**.ratio: number** -
  Required. As far as I know, there's no native way to detect font scaling/properties in Wix so this option is required. Try values between 1 and 2.5 and test using the console.log(tag) callback above for your particular font.
  
  
**.delimiter: string** -
  Optional. In case your .tags and .href values are not comma separated, default is JSON style comma.
  
  
**.whitespace: number** -
  Optional. Inserts n number of non-breaking spaces between tags.
  
  
**.format_all: string** -
  Optional. Adds inline CSS properties to the entire html string.
  
  
**.format_tag: string** -
  Optional. Adds inline CSS properties to each tag's html string.
  
  
**.href: string/array** -
  Optional. You can use wixLocation.to() in your callback if you want, but an href will be better for accessibility.
  
  
**.target: string** -
  Optional. Target for your href link. Assumes all your hrefs will point to the same target.
  
  
**.symbol: boolean** -
  Optional. If set to true, your tags will be displayed and returned with a prepended # symbol.
