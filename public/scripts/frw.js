(function(){
    window.encrypt = {
        "md5":(function(){var hexcase=0;function hex_md5(a){return rstr2hex(rstr_md5(str2rstr_utf8(a)))}function hex_hmac_md5(a,b){return rstr2hex(rstr_hmac_md5(str2rstr_utf8(a),str2rstr_utf8(b)))}function md5_vm_test(){return hex_md5("abc").toLowerCase()=="900150983cd24fb0d6963f7d28e17f72"}function rstr_md5(a){return binl2rstr(binl_md5(rstr2binl(a),a.length*8))}function rstr_hmac_md5(c,f){var e=rstr2binl(c);if(e.length>16){e=binl_md5(e,c.length*8)}var a=Array(16),d=Array(16);for(var b=0;b<16;b++){a[b]=e[b]^909522486;d[b]=e[b]^1549556828}var g=binl_md5(a.concat(rstr2binl(f)),512+f.length*8);return binl2rstr(binl_md5(d.concat(g),512+128))}function rstr2hex(c){try{hexcase}catch(g){hexcase=0}var f=hexcase?"0123456789ABCDEF":"0123456789abcdef";var b="";var a;for(var d=0;d<c.length;d++){a=c.charCodeAt(d);b+=f.charAt((a>>>4)&15)+f.charAt(a&15)}return b}function str2rstr_utf8(c){var b="";var d=-1;var a,e;while(++d<c.length){a=c.charCodeAt(d);e=d+1<c.length?c.charCodeAt(d+1):0;if(55296<=a&&a<=56319&&56320<=e&&e<=57343){a=65536+((a&1023)<<10)+(e&1023);d++}if(a<=127){b+=String.fromCharCode(a)}else{if(a<=2047){b+=String.fromCharCode(192|((a>>>6)&31),128|(a&63))}else{if(a<=65535){b+=String.fromCharCode(224|((a>>>12)&15),128|((a>>>6)&63),128|(a&63))}else{if(a<=2097151){b+=String.fromCharCode(240|((a>>>18)&7),128|((a>>>12)&63),128|((a>>>6)&63),128|(a&63))}}}}}return b}function rstr2binl(b){var a=Array(b.length>>2);for(var c=0;c<a.length;c++){a[c]=0}for(var c=0;c<b.length*8;c+=8){a[c>>5]|=(b.charCodeAt(c/8)&255)<<(c%32)}return a}function binl2rstr(b){var a="";for(var c=0;c<b.length*32;c+=8){a+=String.fromCharCode((b[c>>5]>>>(c%32))&255)}return a}function binl_md5(p,k){p[k>>5]|=128<<((k)%32);p[(((k+64)>>>9)<<4)+14]=k;var o=1732584193;var n=-271733879;var m=-1732584194;var l=271733878;for(var g=0;g<p.length;g+=16){var j=o;var h=n;var f=m;var e=l;o=md5_ff(o,n,m,l,p[g+0],7,-680876936);l=md5_ff(l,o,n,m,p[g+1],12,-389564586);m=md5_ff(m,l,o,n,p[g+2],17,606105819);n=md5_ff(n,m,l,o,p[g+3],22,-1044525330);o=md5_ff(o,n,m,l,p[g+4],7,-176418897);l=md5_ff(l,o,n,m,p[g+5],12,1200080426);m=md5_ff(m,l,o,n,p[g+6],17,-1473231341);n=md5_ff(n,m,l,o,p[g+7],22,-45705983);o=md5_ff(o,n,m,l,p[g+8],7,1770035416);l=md5_ff(l,o,n,m,p[g+9],12,-1958414417);m=md5_ff(m,l,o,n,p[g+10],17,-42063);n=md5_ff(n,m,l,o,p[g+11],22,-1990404162);o=md5_ff(o,n,m,l,p[g+12],7,1804603682);l=md5_ff(l,o,n,m,p[g+13],12,-40341101);m=md5_ff(m,l,o,n,p[g+14],17,-1502002290);n=md5_ff(n,m,l,o,p[g+15],22,1236535329);o=md5_gg(o,n,m,l,p[g+1],5,-165796510);l=md5_gg(l,o,n,m,p[g+6],9,-1069501632);m=md5_gg(m,l,o,n,p[g+11],14,643717713);n=md5_gg(n,m,l,o,p[g+0],20,-373897302);o=md5_gg(o,n,m,l,p[g+5],5,-701558691);l=md5_gg(l,o,n,m,p[g+10],9,38016083);m=md5_gg(m,l,o,n,p[g+15],14,-660478335);n=md5_gg(n,m,l,o,p[g+4],20,-405537848);o=md5_gg(o,n,m,l,p[g+9],5,568446438);l=md5_gg(l,o,n,m,p[g+14],9,-1019803690);m=md5_gg(m,l,o,n,p[g+3],14,-187363961);n=md5_gg(n,m,l,o,p[g+8],20,1163531501);o=md5_gg(o,n,m,l,p[g+13],5,-1444681467);l=md5_gg(l,o,n,m,p[g+2],9,-51403784);m=md5_gg(m,l,o,n,p[g+7],14,1735328473);n=md5_gg(n,m,l,o,p[g+12],20,-1926607734);o=md5_hh(o,n,m,l,p[g+5],4,-378558);l=md5_hh(l,o,n,m,p[g+8],11,-2022574463);m=md5_hh(m,l,o,n,p[g+11],16,1839030562);n=md5_hh(n,m,l,o,p[g+14],23,-35309556);o=md5_hh(o,n,m,l,p[g+1],4,-1530992060);l=md5_hh(l,o,n,m,p[g+4],11,1272893353);m=md5_hh(m,l,o,n,p[g+7],16,-155497632);n=md5_hh(n,m,l,o,p[g+10],23,-1094730640);o=md5_hh(o,n,m,l,p[g+13],4,681279174);l=md5_hh(l,o,n,m,p[g+0],11,-358537222);m=md5_hh(m,l,o,n,p[g+3],16,-722521979);n=md5_hh(n,m,l,o,p[g+6],23,76029189);o=md5_hh(o,n,m,l,p[g+9],4,-640364487);l=md5_hh(l,o,n,m,p[g+12],11,-421815835);m=md5_hh(m,l,o,n,p[g+15],16,530742520);n=md5_hh(n,m,l,o,p[g+2],23,-995338651);o=md5_ii(o,n,m,l,p[g+0],6,-198630844);l=md5_ii(l,o,n,m,p[g+7],10,1126891415);m=md5_ii(m,l,o,n,p[g+14],15,-1416354905);n=md5_ii(n,m,l,o,p[g+5],21,-57434055);o=md5_ii(o,n,m,l,p[g+12],6,1700485571);l=md5_ii(l,o,n,m,p[g+3],10,-1894986606);m=md5_ii(m,l,o,n,p[g+10],15,-1051523);n=md5_ii(n,m,l,o,p[g+1],21,-2054922799);o=md5_ii(o,n,m,l,p[g+8],6,1873313359);l=md5_ii(l,o,n,m,p[g+15],10,-30611744);m=md5_ii(m,l,o,n,p[g+6],15,-1560198380);n=md5_ii(n,m,l,o,p[g+13],21,1309151649);o=md5_ii(o,n,m,l,p[g+4],6,-145523070);l=md5_ii(l,o,n,m,p[g+11],10,-1120210379);m=md5_ii(m,l,o,n,p[g+2],15,718787259);n=md5_ii(n,m,l,o,p[g+9],21,-343485551);o=safe_add(o,j);n=safe_add(n,h);m=safe_add(m,f);l=safe_add(l,e)}return Array(o,n,m,l)}function md5_cmn(h,e,d,c,g,f){return safe_add(bit_rol(safe_add(safe_add(e,h),safe_add(c,f)),g),d)}function md5_ff(g,f,k,j,e,i,h){return md5_cmn((f&k)|((~f)&j),g,f,e,i,h)}function md5_gg(g,f,k,j,e,i,h){return md5_cmn((f&j)|(k&(~j)),g,f,e,i,h)}function md5_hh(g,f,k,j,e,i,h){return md5_cmn(f^k^j,g,f,e,i,h)}function md5_ii(g,f,k,j,e,i,h){return md5_cmn(k^(f|(~j)),g,f,e,i,h)}function safe_add(a,d){var c=(a&65535)+(d&65535);var b=(a>>16)+(d>>16)+(c>>16);return(b<<16)|(c&65535)}function bit_rol(a,b){return(a<<b)|(a>>>(32-b))};return hex_md5})(),
        "sha1":(function(){var hexcase=0;var b64pad="";function hex_sha1(a){return rstr2hex(rstr_sha1(str2rstr_utf8(a)))}function hex_hmac_sha1(a,b){return rstr2hex(rstr_hmac_sha1(str2rstr_utf8(a),str2rstr_utf8(b)))}function sha1_vm_test(){return hex_sha1("abc").toLowerCase()=="a9993e364706816aba3e25717850c26c9cd0d89d"}function rstr_sha1(a){return binb2rstr(binb_sha1(rstr2binb(a),a.length*8))}function rstr_hmac_sha1(c,f){var e=rstr2binb(c);if(e.length>16){e=binb_sha1(e,c.length*8)}var a=Array(16),d=Array(16);for(var b=0;b<16;b++){a[b]=e[b]^909522486;d[b]=e[b]^1549556828}var g=binb_sha1(a.concat(rstr2binb(f)),512+f.length*8);return binb2rstr(binb_sha1(d.concat(g),512+160))}function rstr2hex(c){try{hexcase}catch(g){hexcase=0}var f=hexcase?"0123456789ABCDEF":"0123456789abcdef";var b="";var a;for(var d=0;d<c.length;d++){a=c.charCodeAt(d);b+=f.charAt((a>>>4)&15)+f.charAt(a&15)}return b}function str2rstr_utf8(c){var b="";var d=-1;var a,e;while(++d<c.length){a=c.charCodeAt(d);e=d+1<c.length?c.charCodeAt(d+1):0;if(55296<=a&&a<=56319&&56320<=e&&e<=57343){a=65536+((a&1023)<<10)+(e&1023);d++}if(a<=127){b+=String.fromCharCode(a)}else{if(a<=2047){b+=String.fromCharCode(192|((a>>>6)&31),128|(a&63))}else{if(a<=65535){b+=String.fromCharCode(224|((a>>>12)&15),128|((a>>>6)&63),128|(a&63))}else{if(a<=2097151){b+=String.fromCharCode(240|((a>>>18)&7),128|((a>>>12)&63),128|((a>>>6)&63),128|(a&63))}}}}}return b}function rstr2binb(b){var a=Array(b.length>>2);for(var c=0;c<a.length;c++){a[c]=0}for(var c=0;c<b.length*8;c+=8){a[c>>5]|=(b.charCodeAt(c/8)&255)<<(24-c%32)}return a}function binb2rstr(b){var a="";for(var c=0;c<b.length*32;c+=8){a+=String.fromCharCode((b[c>>5]>>>(24-c%32))&255)}return a}function binb_sha1(v,o){v[o>>5]|=128<<(24-o%32);v[((o+64>>9)<<4)+15]=o;var y=Array(80);var u=1732584193;var s=-271733879;var r=-1732584194;var q=271733878;var p=-1009589776;for(var l=0;l<v.length;l+=16){var n=u;var m=s;var k=r;var h=q;var f=p;for(var g=0;g<80;g++){if(g<16){y[g]=v[l+g]}else{y[g]=bit_rol(y[g-3]^y[g-8]^y[g-14]^y[g-16],1)}var z=safe_add(safe_add(bit_rol(u,5),sha1_ft(g,s,r,q)),safe_add(safe_add(p,y[g]),sha1_kt(g)));p=q;q=r;r=bit_rol(s,30);s=u;u=z}u=safe_add(u,n);s=safe_add(s,m);r=safe_add(r,k);q=safe_add(q,h);p=safe_add(p,f)}return Array(u,s,r,q,p)}function sha1_ft(e,a,g,f){if(e<20){return(a&g)|((~a)&f)}if(e<40){return a^g^f}if(e<60){return(a&g)|(a&f)|(g&f)}return a^g^f}function sha1_kt(a){return(a<20)?1518500249:(a<40)?1859775393:(a<60)?-1894007588:-899497514}function safe_add(a,d){var c=(a&65535)+(d&65535);var b=(a>>16)+(d>>16)+(c>>16);return(b<<16)|(c&65535)}function bit_rol(a,b){return(a<<b)|(a>>>(32-b))};return hex_sha1;})(),
        "sha512":(function(){var hexcase=0;function hex_sha512(a){return rstr2hex(rstr_sha512(str2rstr_utf8(a)))}function hex_hmac_sha512(a,b){return rstr2hex(rstr_hmac_sha512(str2rstr_utf8(a),str2rstr_utf8(b)))}function sha512_vm_test(){return hex_sha512("abc").toLowerCase()=="ddaf35a193617abacc417349ae20413112e6fa4e89a97ea20a9eeee64b55d39a2192992a274fc1a836ba3c23a3feebbd454d4423643ce80e2a9ac94fa54ca49f"}function rstr_sha512(a){return binb2rstr(binb_sha512(rstr2binb(a),a.length*8))}function rstr_hmac_sha512(c,f){var e=rstr2binb(c);if(e.length>32){e=binb_sha512(e,c.length*8)}var a=Array(32),d=Array(32);for(var b=0;b<32;b++){a[b]=e[b]^909522486;d[b]=e[b]^1549556828}var g=binb_sha512(a.concat(rstr2binb(f)),1024+f.length*8);return binb2rstr(binb_sha512(d.concat(g),1024+512))}function rstr2hex(c){try{hexcase}catch(g){hexcase=0}var f=hexcase?"0123456789ABCDEF":"0123456789abcdef";var b="";var a;for(var d=0;d<c.length;d++){a=c.charCodeAt(d);b+=f.charAt((a>>>4)&15)+f.charAt(a&15)}return b}function str2rstr_utf8(c){var b="";var d=-1;var a,e;while(++d<c.length){a=c.charCodeAt(d);e=d+1<c.length?c.charCodeAt(d+1):0;if(55296<=a&&a<=56319&&56320<=e&&e<=57343){a=65536+((a&1023)<<10)+(e&1023);d++}if(a<=127){b+=String.fromCharCode(a)}else{if(a<=2047){b+=String.fromCharCode(192|((a>>>6)&31),128|(a&63))}else{if(a<=65535){b+=String.fromCharCode(224|((a>>>12)&15),128|((a>>>6)&63),128|(a&63))}else{if(a<=2097151){b+=String.fromCharCode(240|((a>>>18)&7),128|((a>>>12)&63),128|((a>>>6)&63),128|(a&63))}}}}}return b}function rstr2binb(b){var a=Array(b.length>>2);for(var c=0;c<a.length;c++){a[c]=0}for(var c=0;c<b.length*8;c+=8){a[c>>5]|=(b.charCodeAt(c/8)&255)<<(24-c%32)}return a}function binb2rstr(b){var a="";for(var c=0;c<b.length*32;c+=8){a+=String.fromCharCode((b[c>>5]>>>(24-c%32))&255)}return a}var sha512_k;function binb_sha512(p,A){if(sha512_k==undefined){sha512_k=new Array(new int64(1116352408,-685199838),new int64(1899447441,602891725),new int64(-1245643825,-330482897),new int64(-373957723,-2121671748),new int64(961987163,-213338824),new int64(1508970993,-1241133031),new int64(-1841331548,-1357295717),new int64(-1424204075,-630357736),new int64(-670586216,-1560083902),new int64(310598401,1164996542),new int64(607225278,1323610764),new int64(1426881987,-704662302),new int64(1925078388,-226784913),new int64(-2132889090,991336113),new int64(-1680079193,633803317),new int64(-1046744716,-815192428),new int64(-459576895,-1628353838),new int64(-272742522,944711139),new int64(264347078,-1953704523),new int64(604807628,2007800933),new int64(770255983,1495990901),new int64(1249150122,1856431235),new int64(1555081692,-1119749164),new int64(1996064986,-2096016459),new int64(-1740746414,-295247957),new int64(-1473132947,766784016),new int64(-1341970488,-1728372417),new int64(-1084653625,-1091629340),new int64(-958395405,1034457026),new int64(-710438585,-1828018395),new int64(113926993,-536640913),new int64(338241895,168717936),new int64(666307205,1188179964),new int64(773529912,1546045734),new int64(1294757372,1522805485),new int64(1396182291,-1651133473),new int64(1695183700,-1951439906),new int64(1986661051,1014477480),new int64(-2117940946,1206759142),new int64(-1838011259,344077627),new int64(-1564481375,1290863460),new int64(-1474664885,-1136513023),new int64(-1035236496,-789014639),new int64(-949202525,106217008),new int64(-778901479,-688958952),new int64(-694614492,1432725776),new int64(-200395387,1467031594),new int64(275423344,851169720),new int64(430227734,-1194143544),new int64(506948616,1363258195),new int64(659060556,-544281703),new int64(883997877,-509917016),new int64(958139571,-976659869),new int64(1322822218,-482243893),new int64(1537002063,2003034995),new int64(1747873779,-692930397),new int64(1955562222,1575990012),new int64(2024104815,1125592928),new int64(-2067236844,-1578062990),new int64(-1933114872,442776044),new int64(-1866530822,593698344),new int64(-1538233109,-561857047),new int64(-1090935817,-1295615723),new int64(-965641998,-479046869),new int64(-903397682,-366583396),new int64(-779700025,566280711),new int64(-354779690,-840897762),new int64(-176337025,-294727304),new int64(116418474,1914138554),new int64(174292421,-1563912026),new int64(289380356,-1090974290),new int64(460393269,320620315),new int64(685471733,587496836),new int64(852142971,1086792851),new int64(1017036298,365543100),new int64(1126000580,-1676669620),new int64(1288033470,-885112138),new int64(1501505948,-60457430),new int64(1607167915,987167468),new int64(1816402316,1246189591))}var q=new Array(new int64(1779033703,-205731576),new int64(-1150833019,-2067093701),new int64(1013904242,-23791573),new int64(-1521486534,1595750129),new int64(1359893119,-1377402159),new int64(-1694144372,725511199),new int64(528734635,-79577749),new int64(1541459225,327033209));var s=new int64(0,0),r=new int64(0,0),J=new int64(0,0),I=new int64(0,0),G=new int64(0,0),F=new int64(0,0),E=new int64(0,0),D=new int64(0,0),C=new int64(0,0),B=new int64(0,0),m=new int64(0,0),l=new int64(0,0),t=new int64(0,0),o=new int64(0,0),z=new int64(0,0),w=new int64(0,0),u=new int64(0,0);var v,y;var n=new Array(80);for(y=0;y<80;y++){n[y]=new int64(0,0)}p[A>>5]|=128<<(24-(A&31));p[((A+128>>10)<<5)+31]=A;for(y=0;y<p.length;y+=32){int64copy(J,q[0]);int64copy(I,q[1]);int64copy(G,q[2]);int64copy(F,q[3]);int64copy(E,q[4]);int64copy(D,q[5]);int64copy(C,q[6]);int64copy(B,q[7]);for(v=0;v<16;v++){n[v].h=p[y+2*v];n[v].l=p[y+2*v+1]}for(v=16;v<80;v++){int64rrot(z,n[v-2],19);int64revrrot(w,n[v-2],29);int64shr(u,n[v-2],6);l.l=z.l^w.l^u.l;l.h=z.h^w.h^u.h;int64rrot(z,n[v-15],1);int64rrot(w,n[v-15],8);int64shr(u,n[v-15],7);m.l=z.l^w.l^u.l;m.h=z.h^w.h^u.h;int64add4(n[v],l,n[v-7],m,n[v-16])}for(v=0;v<80;v++){t.l=(E.l&D.l)^(~E.l&C.l);t.h=(E.h&D.h)^(~E.h&C.h);int64rrot(z,E,14);int64rrot(w,E,18);int64revrrot(u,E,9);l.l=z.l^w.l^u.l;l.h=z.h^w.h^u.h;int64rrot(z,J,28);int64revrrot(w,J,2);int64revrrot(u,J,7);m.l=z.l^w.l^u.l;m.h=z.h^w.h^u.h;o.l=(J.l&I.l)^(J.l&G.l)^(I.l&G.l);o.h=(J.h&I.h)^(J.h&G.h)^(I.h&G.h);int64add5(s,B,l,t,sha512_k[v],n[v]);int64add(r,m,o);int64copy(B,C);int64copy(C,D);int64copy(D,E);int64add(E,F,s);int64copy(F,G);int64copy(G,I);int64copy(I,J);int64add(J,s,r)}int64add(q[0],q[0],J);int64add(q[1],q[1],I);int64add(q[2],q[2],G);int64add(q[3],q[3],F);int64add(q[4],q[4],E);int64add(q[5],q[5],D);int64add(q[6],q[6],C);int64add(q[7],q[7],B)}var k=new Array(16);for(y=0;y<8;y++){k[2*y]=q[y].h;k[2*y+1]=q[y].l}return k}function int64(b,a){this.h=b;this.l=a}function int64copy(b,a){b.h=a.h;b.l=a.l}function int64rrot(c,a,b){c.l=(a.l>>>b)|(a.h<<(32-b));c.h=(a.h>>>b)|(a.l<<(32-b))}function int64revrrot(c,a,b){c.l=(a.h>>>b)|(a.l<<(32-b));c.h=(a.l>>>b)|(a.h<<(32-b))}function int64shr(c,a,b){c.l=(a.l>>>b)|(a.h<<(32-b));c.h=(a.h>>>b)}function int64add(g,b,f){var d=(b.l&65535)+(f.l&65535);var c=(b.l>>>16)+(f.l>>>16)+(d>>>16);var a=(b.h&65535)+(f.h&65535)+(c>>>16);var e=(b.h>>>16)+(f.h>>>16)+(a>>>16);g.l=(d&65535)|(c<<16);g.h=(a&65535)|(e<<16)}function int64add4(j,m,l,k,i){var h=(m.l&65535)+(l.l&65535)+(k.l&65535)+(i.l&65535);var g=(m.l>>>16)+(l.l>>>16)+(k.l>>>16)+(i.l>>>16)+(h>>>16);var f=(m.h&65535)+(l.h&65535)+(k.h&65535)+(i.h&65535)+(g>>>16);var e=(m.h>>>16)+(l.h>>>16)+(k.h>>>16)+(i.h>>>16)+(f>>>16);j.l=(h&65535)|(g<<16);j.h=(f&65535)|(e<<16)}function int64add5(l,o,n,m,k,j){var i=(o.l&65535)+(n.l&65535)+(m.l&65535)+(k.l&65535)+(j.l&65535);var h=(o.l>>>16)+(n.l>>>16)+(m.l>>>16)+(k.l>>>16)+(j.l>>>16)+(i>>>16);var g=(o.h&65535)+(n.h&65535)+(m.h&65535)+(k.h&65535)+(j.h&65535)+(h>>>16);var f=(o.h>>>16)+(n.h>>>16)+(m.h>>>16)+(k.h>>>16)+(j.h>>>16)+(g>>>16);l.l=(i&65535)|(h<<16);l.h=(g&65535)|(f<<16)};return hex_sha512;})(),
        "sha256":(function(){var hexcase=0;function hex_sha256(a){return rstr2hex(rstr_sha256(str2rstr_utf8(a)))}function hex_hmac_sha256(a,b){return rstr2hex(rstr_hmac_sha256(str2rstr_utf8(a),str2rstr_utf8(b)))}function sha256_vm_test(){return hex_sha256("abc").toLowerCase()=="ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad"}function rstr_sha256(a){return binb2rstr(binb_sha256(rstr2binb(a),a.length*8))}function rstr_hmac_sha256(c,f){var e=rstr2binb(c);if(e.length>16){e=binb_sha256(e,c.length*8)}var a=Array(16),d=Array(16);for(var b=0;b<16;b++){a[b]=e[b]^909522486;d[b]=e[b]^1549556828}var g=binb_sha256(a.concat(rstr2binb(f)),512+f.length*8);return binb2rstr(binb_sha256(d.concat(g),512+256))}function rstr2hex(c){try{hexcase}catch(g){hexcase=0}var f=hexcase?"0123456789ABCDEF":"0123456789abcdef";var b="";var a;for(var d=0;d<c.length;d++){a=c.charCodeAt(d);b+=f.charAt((a>>>4)&15)+f.charAt(a&15)}return b}function str2rstr_utf8(c){var b="";var d=-1;var a,e;while(++d<c.length){a=c.charCodeAt(d);e=d+1<c.length?c.charCodeAt(d+1):0;if(55296<=a&&a<=56319&&56320<=e&&e<=57343){a=65536+((a&1023)<<10)+(e&1023);d++}if(a<=127){b+=String.fromCharCode(a)}else{if(a<=2047){b+=String.fromCharCode(192|((a>>>6)&31),128|(a&63))}else{if(a<=65535){b+=String.fromCharCode(224|((a>>>12)&15),128|((a>>>6)&63),128|(a&63))}else{if(a<=2097151){b+=String.fromCharCode(240|((a>>>18)&7),128|((a>>>12)&63),128|((a>>>6)&63),128|(a&63))}}}}}return b}function rstr2binb(b){var a=Array(b.length>>2);for(var c=0;c<a.length;c++){a[c]=0}for(var c=0;c<b.length*8;c+=8){a[c>>5]|=(b.charCodeAt(c/8)&255)<<(24-c%32)}return a}function binb2rstr(b){var a="";for(var c=0;c<b.length*32;c+=8){a+=String.fromCharCode((b[c>>5]>>>(24-c%32))&255)}return a}function sha256_S(b,a){return(b>>>a)|(b<<(32-a))}function sha256_R(b,a){return(b>>>a)}function sha256_Ch(a,c,b){return((a&c)^((~a)&b))}function sha256_Maj(a,c,b){return((a&c)^(a&b)^(c&b))}function sha256_Sigma0256(a){return(sha256_S(a,2)^sha256_S(a,13)^sha256_S(a,22))}function sha256_Sigma1256(a){return(sha256_S(a,6)^sha256_S(a,11)^sha256_S(a,25))}function sha256_Gamma0256(a){return(sha256_S(a,7)^sha256_S(a,18)^sha256_R(a,3))}function sha256_Gamma1256(a){return(sha256_S(a,17)^sha256_S(a,19)^sha256_R(a,10))}function sha256_Sigma0512(a){return(sha256_S(a,28)^sha256_S(a,34)^sha256_S(a,39))}function sha256_Sigma1512(a){return(sha256_S(a,14)^sha256_S(a,18)^sha256_S(a,41))}function sha256_Gamma0512(a){return(sha256_S(a,1)^sha256_S(a,8)^sha256_R(a,7))}function sha256_Gamma1512(a){return(sha256_S(a,19)^sha256_S(a,61)^sha256_R(a,6))}var sha256_K=new Array(1116352408,1899447441,-1245643825,-373957723,961987163,1508970993,-1841331548,-1424204075,-670586216,310598401,607225278,1426881987,1925078388,-2132889090,-1680079193,-1046744716,-459576895,-272742522,264347078,604807628,770255983,1249150122,1555081692,1996064986,-1740746414,-1473132947,-1341970488,-1084653625,-958395405,-710438585,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,-2117940946,-1838011259,-1564481375,-1474664885,-1035236496,-949202525,-778901479,-694614492,-200395387,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,-2067236844,-1933114872,-1866530822,-1538233109,-1090935817,-965641998);function binb_sha256(n,o){var p=new Array(1779033703,-1150833019,1013904242,-1521486534,1359893119,-1694144372,528734635,1541459225);var k=new Array(64);var B,A,z,y,w,u,t,s;var r,q,x,v;n[o>>5]|=128<<(24-o%32);n[((o+64>>9)<<4)+15]=o;for(r=0;r<n.length;r+=16){B=p[0];A=p[1];z=p[2];y=p[3];w=p[4];u=p[5];t=p[6];s=p[7];for(q=0;q<64;q++){if(q<16){k[q]=n[q+r]}else{k[q]=safe_add(safe_add(safe_add(sha256_Gamma1256(k[q-2]),k[q-7]),sha256_Gamma0256(k[q-15])),k[q-16])}x=safe_add(safe_add(safe_add(safe_add(s,sha256_Sigma1256(w)),sha256_Ch(w,u,t)),sha256_K[q]),k[q]);v=safe_add(sha256_Sigma0256(B),sha256_Maj(B,A,z));s=t;t=u;u=w;w=safe_add(y,x);y=z;z=A;A=B;B=safe_add(x,v)}p[0]=safe_add(B,p[0]);p[1]=safe_add(A,p[1]);p[2]=safe_add(z,p[2]);p[3]=safe_add(y,p[3]);p[4]=safe_add(w,p[4]);p[5]=safe_add(u,p[5]);p[6]=safe_add(t,p[6]);p[7]=safe_add(s,p[7])}return p}function safe_add(a,d){var c=(a&65535)+(d&65535);var b=(a>>16)+(d>>16)+(c>>16);return(b<<16)|(c&65535)};return hex_sha256;})(),
        "rmd160":(function(){var hexcase=0;function hex_rmd160(a){return rstr2hex(rstr_rmd160(str2rstr_utf8(a)))}function hex_hmac_rmd160(a,b){return rstr2hex(rstr_hmac_rmd160(str2rstr_utf8(a),str2rstr_utf8(b)))}function rmd160_vm_test(){return hex_rmd160("abc").toLowerCase()=="8eb208f7e05d987a9b044a8e98c6b087f15a0bfc"}function rstr_rmd160(a){return binl2rstr(binl_rmd160(rstr2binl(a),a.length*8))}function rstr_hmac_rmd160(c,f){var e=rstr2binl(c);if(e.length>16){e=binl_rmd160(e,c.length*8)}var a=Array(16),d=Array(16);for(var b=0;b<16;b++){a[b]=e[b]^909522486;d[b]=e[b]^1549556828}var g=binl_rmd160(a.concat(rstr2binl(f)),512+f.length*8);return binl2rstr(binl_rmd160(d.concat(g),512+160))}function rstr2hex(c){try{hexcase}catch(g){hexcase=0}var f=hexcase?"0123456789ABCDEF":"0123456789abcdef";var b="";var a;for(var d=0;d<c.length;d++){a=c.charCodeAt(d);b+=f.charAt((a>>>4)&15)+f.charAt(a&15)}return b}function str2rstr_utf8(c){var b="";var d=-1;var a,e;while(++d<c.length){a=c.charCodeAt(d);e=d+1<c.length?c.charCodeAt(d+1):0;if(55296<=a&&a<=56319&&56320<=e&&e<=57343){a=65536+((a&1023)<<10)+(e&1023);d++}if(a<=127){b+=String.fromCharCode(a)}else{if(a<=2047){b+=String.fromCharCode(192|((a>>>6)&31),128|(a&63))}else{if(a<=65535){b+=String.fromCharCode(224|((a>>>12)&15),128|((a>>>6)&63),128|(a&63))}else{if(a<=2097151){b+=String.fromCharCode(240|((a>>>18)&7),128|((a>>>12)&63),128|((a>>>6)&63),128|(a&63))}}}}}return b}function rstr2binl(b){var a=Array(b.length>>2);for(var c=0;c<a.length;c++){a[c]=0}for(var c=0;c<b.length*8;c+=8){a[c>>5]|=(b.charCodeAt(c/8)&255)<<(c%32)}return a}function binl2rstr(b){var a="";for(var c=0;c<b.length*32;c+=8){a+=String.fromCharCode((b[c>>5]>>>(c%32))&255)}return a}function binl_rmd160(q,v){q[v>>5]|=128<<(v%32);q[(((v+64)>>>9)<<4)+14]=v;var l=1732584193;var k=4023233417;var h=2562383102;var g=271733878;var f=3285377520;for(var u=0;u<q.length;u+=16){var e;var c=l,o=k,t=h,d=g,p=f;var a=l,m=k,s=h,b=g,n=f;for(var r=0;r<=79;++r){e=safe_add(c,rmd160_f(r,o,t,d));e=safe_add(e,q[u+rmd160_r1[r]]);e=safe_add(e,rmd160_K1(r));e=safe_add(bit_rol(e,rmd160_s1[r]),p);c=p;p=d;d=bit_rol(t,10);t=o;o=e;e=safe_add(a,rmd160_f(79-r,m,s,b));e=safe_add(e,q[u+rmd160_r2[r]]);e=safe_add(e,rmd160_K2(r));e=safe_add(bit_rol(e,rmd160_s2[r]),n);a=n;n=b;b=bit_rol(s,10);s=m;m=e}e=safe_add(k,safe_add(t,b));k=safe_add(h,safe_add(d,n));h=safe_add(g,safe_add(p,a));g=safe_add(f,safe_add(c,m));f=safe_add(l,safe_add(o,s));l=e}return[l,k,h,g,f]}function rmd160_f(b,a,d,c){return(0<=b&&b<=15)?(a^d^c):(16<=b&&b<=31)?(a&d)|(~a&c):(32<=b&&b<=47)?(a|~d)^c:(48<=b&&b<=63)?(a&c)|(d&~c):(64<=b&&b<=79)?a^(d|~c):"rmd160_f: j out of range"}function rmd160_K1(a){return(0<=a&&a<=15)?0:(16<=a&&a<=31)?1518500249:(32<=a&&a<=47)?1859775393:(48<=a&&a<=63)?2400959708:(64<=a&&a<=79)?2840853838:"rmd160_K1: j out of range"}function rmd160_K2(a){return(0<=a&&a<=15)?1352829926:(16<=a&&a<=31)?1548603684:(32<=a&&a<=47)?1836072691:(48<=a&&a<=63)?2053994217:(64<=a&&a<=79)?0:"rmd160_K2: j out of range"}var rmd160_r1=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,7,4,13,1,10,6,15,3,12,0,9,5,2,14,11,8,3,10,14,4,9,15,8,1,2,7,0,6,13,11,5,12,1,9,11,10,0,8,12,4,13,3,7,15,14,5,6,2,4,0,5,9,7,12,2,10,14,1,3,8,11,6,15,13];var rmd160_r2=[5,14,7,0,9,2,11,4,13,6,15,8,1,10,3,12,6,11,3,7,0,13,5,10,14,15,8,12,4,9,1,2,15,5,1,3,7,14,6,9,11,8,12,2,10,0,4,13,8,6,4,1,3,11,15,0,5,12,2,13,9,7,10,14,12,15,10,4,1,5,8,7,6,2,13,14,0,3,9,11];var rmd160_s1=[11,14,15,12,5,8,7,9,11,13,14,15,6,7,9,8,7,6,8,13,11,9,7,15,7,12,15,9,11,7,13,12,11,13,6,7,14,9,13,15,14,8,13,6,5,12,7,5,11,12,14,15,14,15,9,8,9,14,5,6,8,6,5,12,9,15,5,11,6,8,13,12,5,12,13,14,11,8,5,6];var rmd160_s2=[8,9,9,11,13,15,15,5,7,7,8,11,14,14,12,6,9,13,15,7,12,8,9,11,7,7,12,7,6,15,13,11,9,7,15,11,8,6,6,14,12,13,5,14,13,13,7,5,15,5,8,11,14,14,6,14,6,9,12,9,12,5,15,8,8,5,12,9,12,5,14,6,8,13,6,5,15,13,11,11];function safe_add(a,d){var c=(a&65535)+(d&65535);var b=(a>>16)+(d>>16)+(c>>16);return(b<<16)|(c&65535)}function bit_rol(a,b){return(a<<b)|(a>>>(32-b))};return hex_rmd160;})()
    };
    (function() {
        DEBUG = true;

        var logProps = ["log", "debug", "info", "warn", "error"];
        var generalProps = ["assert", "clear", "count", "dir", "dirxml", "exception", "group", "groupCollapsed", "groupEnd", "markTimeline", "memoryProfile", "memoryProfileEnd", "profile", "profileEnd", "table", "time", "timeEnd", "timeStamp", "trace"];

        //console is not available or disabled
        if(typeof(window.console) === "undefined" || typeof(DEBUG) === "undefined" || (typeof(DEBUG) === "boolean" && !DEBUG) || (typeof(DEBUG) === "string" && DEBUG.toLowerCase() == "off")) {
            //disable all
            window.console = {};
            var props = generalProps.concat(logProps);
            for(var i=0; i<props.length; i++) {
                disableProp(props[i]);
            }
        } else if(typeof(window.console) !== "undefined") {
            //console is available and not disabled

            for(var i=0; i<generalProps.length; i++) {
                //enable all general console props if debug mode is on, disable otherwise
                if((typeof(DEBUG) === "boolean" && DEBUG) || (typeof(DEBUG) === "string" && DEBUG.toLowerCase() == "on")) {
                    enableProp(generalProps[i]);
                } else {
                    disableProp(generalProps[i]);
                }
            }

            //enable log props above logging level
            var level = logProps[0];
            if(typeof(DEBUG) === "string") {
                level = (DEBUG.toLowerCase() == "on" ? logProps[0] : DEBUG);
            }

            var levelReached = false;
            for(var i=0; i<logProps.length; i++) {
                if(logProps[i] == level) {
                    levelReached = true;
                }
                levelReached ? enableProp(logProps[i]) : disableProp(logProps[i]);
            }
        }

        function disableProp(prop) {
            window.console[prop] = function(){};
        }

        function enableProp(prop) {
            if(typeof(window.console[prop]) === "undefined") disableProp(prop);
        }
    })();
    window.browser = {
        IE : !!(window.attachEvent && !window.opera)||!!navigator.userAgent.match(/Trident\/7\./),
        Firefox : navigator.userAgent.indexOf('Firefox')!=-1,
        Opera : !!window.opera,
        WebKit : navigator.userAgent.indexOf('AppleWebKit/') > -1,
        Gecko : navigator.userAgent.indexOf('Gecko') > -1 && navigator.userAgent.indexOf('KHTML') == -1,
        MobileSafari : !!navigator.userAgent.match(/Apple.*Mobile.*Safari/),
        Mobile : /iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()),
        Android : navigator.userAgent.toLowerCase().search("android") > -1 && navigator.userAgent.toLowerCase().search("mobile") > -1,
        AndriodTablet : navigator.userAgent.toLowerCase().search("android") > -1 && !navigator.userAgent.toLowerCase().search("mobile") > -1,
        Blackberry : navigator.userAgent.toLowerCase().search("blackberry") > -1,
        Iphone : navigator.userAgent.toLowerCase().search("iphone") > -1,
        Ipod : navigator.userAgent.toLowerCase().search("ipod") > -1,
        Ipad : navigator.userAgent.toLowerCase().search("ipad") > -1,
        version : (navigator.userAgent.match( /.+(?:rv|it|ra|ie|RV|IT|RA|IE)[\/: ]([\d.]+)/ ) || [])[1]
    };
    var yes=true;

    (function(){
        'use strict';

        // Add ECMA262-5 method binding if not supported natively
        //
        if (!('bind' in Function.prototype)) {
            Function.prototype.bind= function(owner) {
                var that= this;
                if (arguments.length<=1) {
                    return function() {
                        return that.apply(owner, arguments);
                    };
                } else {
                    var args= Array.prototype.slice.call(arguments, 1);
                    return function() {
                        return that.apply(owner, arguments.length===0? args : args.concat(Array.prototype.slice.call(arguments)));
                    };
                }
            };
        }
        // Add ECMA262-5 Array methods if not supported natively
        //
        if (!('indexOf' in Array.prototype)) {
            Array.prototype.indexOf= function(find, i /*opt*/) {
                if (i===undefined) i= 0;
                if (i<0) i+= this.length;
                if (i<0) i= 0;
                for (var n= this.length; i<n; i++)
                    if (i in this && this[i]===find)
                        return i;
                return -1;
            };
        }
        if (!('lastIndexOf' in Array.prototype)) {
            Array.prototype.lastIndexOf= function(find, i /*opt*/) {
                if (i===undefined) i= this.length-1;
                if (i<0) i+= this.length;
                if (i>this.length-1) i= this.length-1;
                for (i++; i-->0;) /* i++ because from-argument is sadly inclusive */
                    if (i in this && this[i]===find)
                        return i;
                return -1;
            };
        }
        if (!('forEach' in Array.prototype)) {
            Array.prototype.forEach= function(action, that /*opt*/) {
                for (var i= 0, n= this.length; i<n; i++)
                    if (i in this)
                        action.call(that, this[i], i, this);
            };
        }
        if (!('map' in Array.prototype)) {
            Array.prototype.map= function(mapper, that /*opt*/) {
                var other= new Array(this.length);
                for (var i= 0, n= this.length; i<n; i++)
                    if (i in this)
                        other[i]= mapper.call(that, this[i], i, this);
                return other;
            };
        }
        if (!('filter' in Array.prototype)) {
            Array.prototype.filter= function(filter, that /*opt*/) {
                var other= [], v;
                for (var i=0, n= this.length; i<n; i++)
                    if (i in this && filter.call(that, v= this[i], i, this))
                        other.push(v);
                return other;
            };
        }
        if (!('every' in Array.prototype)) {
            Array.prototype.every= function(tester, that /*opt*/) {
                for (var i= 0, n= this.length; i<n; i++)
                    if (i in this && !tester.call(that, this[i], i, this))
                        return false;
                return true;
            };
        }
        if (!('some' in Array.prototype)) {
            Array.prototype.some= function(tester, that /*opt*/) {
                for (var i= 0, n= this.length; i<n; i++)
                    if (i in this && tester.call(that, this[i], i, this))
                        return true;
                return false;
            };
        }
    })();
    window.clone=function(obj) {
        var copy;

        // Handle the 3 simple types, and null or undefined
        if (null == obj || "object" != typeof obj) return obj;

        // Handle Date
        if (obj instanceof Date) {
            copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }

        // Handle Array
        if (obj instanceof Array) {
            copy = [];
            for (var i = 0, len = obj.length; i < len; i++) {
                copy[i] = clone(obj[i]);
            }
            return copy;
        }

        // Handle Object
        if (obj instanceof Object) {
            copy = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
            }
            return copy;
        }

        throw new Error("Unable to copy obj! Its type isn't supported.");
    }

    if(!Array.find||!window.find){
        Array.prototype.find= function(what, i){
            i= i || 0;
            var L= this.length;
            while(i< L){
                if(typeof this[i] === "function"){
                    if(this[i] == what)return i;
                }else{
                    if(typeof what === "function"){
                        if(what.apply(this[i],[]))return i;
                    }else{
                        if(this[i] == what)return i;
                    }
                }
                ++i;
            }
            return -1;
        }
        Array.prototype.feachAll= function(what, i){
            i= i || 0;
            var L= this.length;
            var itms = [];
            while(i< L){
                if(typeof this[i] === "function"){
                    if(this[i] == what)itms.push(this[i]);
                }else{
                    if(typeof what === "function"){
                        if(what.apply(this[i],[]))itms.push(this[i]);
                    }else{
                        if(this[i] == what)itms.push(this[i]);
                    }
                }
                ++i;
            }
            return itms;
        }
        window.find = function(list, what, i){
            i= i || 0;
            var L= list.length;
            while(i< L){
                if(typeof list[i] === "function"){
                    if(list[i] == what)return i;
                }else{
                    if(typeof what === "function"){
                        if(what.apply(list[i],[]))return i;
                    }else{
                        if(list[i] == what)return i;
                    }
                }
                ++i;
            }
            return -1;
        }
    }
    if(!Array.contains){
        Array.prototype.contains = function (obj) {
            for (var i = 0; i < this.length; i++) if (this[i] === obj) return true;
            return false;
        }
    }
    if(!Array.remove){
        Array.prototype.remove= function(){
            var what, a= arguments, L= a.length, ax;
            while(L && this.length){
                what= a[--L];
                while((ax= this.indexOf(what))!= -1)this.splice(ax, 1);
            }
            return this;
        }
    }
    if(!Array.insert){
        Array.prototype.insert = function(i,elm){
            if(!is_number(i))return this;
            if(i<0||i>=this.length){
                this.push(elm);
                return this;
            }
            this.splice(i, 0, elm);
            return this;
        }
    }
    if(!Array.removeIndex){
        Array.prototype.removeIndex= function(i){
            if(!is_number(i))return this;
            if(i<0||i>=this.length)return this;
            this.splice(i, 1);
            return this;
        }
    }
    if(!window.each){
        var threadedEach=function(elm, fn){
            if("function" !== (typeof fn))throw ("Invalid arguments");
            "boolean"
            var i=0;
            if(!elm)return;
            var cnt = elm.length;
            function thread(){
                if(elm[i]){
                    fn.apply(elm[i],[i,elm[i]]);
                    i++;
                    if(elm.length!=cnt)i--;
                    requestAnimationFrame(thread);
                }
            }
            thread();
            return elm;
        }
        window.each=function(elm, fn, threaded){
            if("function" !== (typeof fn))throw ("Invalid arguments");
            if(typeof threaded === "boolean" && threaded === true)return threadedEach(elm,fn);
            var i=0;
            if(!elm)return;
            var cnt = elm.length;
            while(elm[i]){
                var t = fn.apply(elm[i],[i,elm[i]]);
                if(t==false)break;
                i++;
                if(elm.length!=cnt){
                    i--;
                    cnt = elm.length;
                }
            }
            return elm;
        }
        Array.prototype.each=function(fn, threaded){
            return window.each(this,fn,threaded);
        }
    }
    if(!window.is_array){
        window.is_array = function (o) {
            if(o != null && typeof o == 'object')return (typeof o.push == 'undefined') ? false : true;
            else return false;
        }
    }
    if(!window.is_node){
        window.is_node = function(o){
            return (
                typeof Node === "object" ? o instanceof Node :
                    o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName==="string");
        }
    }
    if(!window.is_window){
        window.is_window = function(obj){
            return obj && typeof obj === "object" && "setInterval" in obj;
        }
    }
    if(!window.is_object){
        (function(tos) {
            var dbj={};
            var fs_ = tos.call(function() { }),
                os_ = tos.call({});
            dbj.isFunction = ("function" === (typeof window.open)) ? function(f) {
                return fs_ === tos.call(f);
            } : function(f) {
                try {
                    return /\bfunction\b/.test(f);
                } catch (x) {
                    return false;
                }
            };
            dbj.isObject = ("function" === (typeof window.open)) ? function(x) {
                if(x == undefined)return false;
                return (os_ === tos.call(x));
            } : function(x) {
                if(x == undefined)return false;
                if (dbj.isFunction(x)) return false;
                return (os_ === tos.call(x));
            };
            window.is_object=function(obj){return dbj.isObject(obj)};
            window.is_function=function(obj){return dbj.isFunction(obj)};
        })(Object.prototype.toString);
    }
    if(!window.is_element){
        window.is_element = function(o){
            return (
                typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
                    o && typeof o === "object" && o.nodeType === 1 && typeof o.nodeName==="string");
        }
    }
    if(!window.is_numeric){
        window.is_numeric = function(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        }
    }
    if(!window.is_number){
        window.is_number = function(n) {
            return typeof n === "number" && !isNaN(n);
        }
    }
    if(!window.is_string){
        window.is_string = function(s){
            return typeof(s)=='string'&&s!="";
        }
    }
    RegExp.escape= function(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    };
    var linkHash=window.location.href.replace( /^[^#]*#?(.*)$/, '$1' );
    var hashFunctions=new Array();
    var isHashSet=false;
    if(!window.Element&&!window.HTMLElement){
        window.Element = {};
        var __IEcreateElement = document.createElement;
        document.createElement = function (tagName) {
            var element = __IEcreateElement(tagName);
            for (method in window.Element)element[method] = window.Element[method];
            return element;
        }
        var __IEgetElementById = document.getElementById;
        document.getElementById = function (id) {
            var element = __IEgetElementById(id);
            if(!element)return element;
            for (method in window.Element)element[method] = window.Element[method];
            return element;
        }
        var __IEgetElementsByName = document.getElementsByName;
        document.getElementsByName= function (name) {
            var el = __IEgetElementsByName(name);
            for (i=0;i<el.length;i++)for (method in window.Element)(el[i])[method] = window.Element[method];
            return el;
        }
        var __IEgetElementsByTagName = document.getElementsByTagName;
        document.getElementsByTagName= function (name) {
            var el = __IEgetElementsByTagName(name);
            for (i=0;i<el.length;i++)for (method in window.Element)(el[i])[method] = window.Element[method];
            return el;
        }
        var __IEgetElementsByTagNameNS = document.getElementsByTagNameNS;
        document.getElementsByTagNameNS=function (namespace,name) {
            var el = __IEgetElementsByTagNameNS(namespace,name);
            for (i=0;i<el.length;i++)for (method in window.Element)(el[i])[method] = window.Element[method];
            return el;
        }
        yes=false;
    }
    window.OLD=!yes;
    var __data__= {};
    window.extendObject=function(name,fn,obj){
        var t = "___data___" + encrypt.md5(name);
        var _fn = function(){
            if(is_function(this[t])){
                this["__previous__"]=fn;
                var rtn =  this[t].apply(this,arguments);
                this["__previous__"]=undefined;
                return rtn;
            }
            else return fn.apply(this,arguments);
        }
        __data__[name]=true;
        if(window.HTMLElement){
            HTMLElement.prototype[name]=_fn;
        }else if(window.Element&&yes){
            Element.prototype[name]=_fn;
        }
        if(obj==true||(browser.IE&&browser.version<8))Object.prototype[name]=_fn;
        if(!window[name])window[name]=_fn;
        if(!document[name])document[name]=_fn;
    }
    window.isEventSupported = (function(){
        var TAGNAMES = {
            'select':'input','change':'input',
            'submit':'form','reset':'form',
            'error':'img','load':'img','abort':'img','hashchange':'window'
        }
        function isEventSupported(eventName) {
            if(eventName=="hashchange")return 'onhashchange' in window && ( document.documentMode === undefined || document.documentMode > 8) ;
            var el = TAGNAMES[eventName]=="window"?window:document.createElement(TAGNAMES[eventName] || 'div');
            eventName = 'on' + eventName;
            var isSupported = (eventName in el);
            if (!isSupported) {
                el.setAttribute(eventName, 'return;');
                isSupported = typeof el[eventName] == 'function';
            }
            el = null;
            return isSupported;
        }
        return isEventSupported;
    })();
    extendObject("overWrite",function(name,fun){
        if(is_string(name)&&is_function(fun)){
            var ant = null;
            if(__data__[name]){
                if(is_function(this[name])){
                    ant = this["___data___" + encrypt.md5(name)];
                    this["___data___" + encrypt.md5(name)] = fun;
                }
            }else{
                ant = this[name];
                this[name] = fun;
            }
            if(!this["___data___" + encrypt.md5(name) + "restaure"]) this["___data___" + encrypt.md5(name) + "restaure"] = ant;
        }
    });
    extendObject("restaureOverWrite",function(name){
        if(is_string(name)){
            if(__data__[name]){
                if(is_function(this[name]))this["___data___" + encrypt.md5(name)] = null;
            }else if(is_function(this["___data___" + encrypt.md5(name) + "restaure"])) this[name] = this["___data___" + encrypt.md5(name) + "restaure"];
        }
    });
    extendObject("insert",function(elm,index){
        if(!is_number(index))index==-1;
        if(this.childNodes.length<index+1)index=-1;
        if(index<0)this.appendChild(elm);
        else this.insertBefore(elm,this.childNodes[index]);
    });
    extendObject("eventSupported",function(eventName){
        if(eventName=="hashchange")return 'onhashchange' in window && ( document.documentMode === undefined || document.documentMode > 8) ;
        eventName = 'on' + eventName;
        el=(typeof this.setAttribute=="undefined"?window:this);
        var isSupported = (eventName in el);
        try{
            if (!isSupported) {
                el.setAttribute(eventName, 'return;');
                isSupported = typeof el[eventName] == 'function';
            }
        }catch(e){
        }
        return isSupported;
    });
    var hlod = false;
    var hready = false;
    var hasloadLoad = false;
    var hasloadReady = false;
    var __loadfunctions__ = [];
    var __loadfunction__ =function(e){
        if(hasloadReady||!hready){
            __loadfunctions__.each(function(i,elm){try{this.apply(window,[e]);}catch(e){console.error(e);}},false);
            if(window.frwEvent)
                if(window.frwEvent["afterload"])
                    if(is_array(window.frwEvent["afterload"]))
                        window.frwEvent["afterload"].each(function(i,elm){try{this.fn.apply(window,[e,this.fn]);}catch(e){console.error(e);}},false);
            __loadfunctions__=[];
        }
        hasloadLoad = true;
    };
    if(!this.addEventListener){
        window.attachEvent('onload',__loadfunction__);
    }else{
        window.addEventListener("load",__loadfunction__,false);
    }
    var __onbeforeunload__ = []
    window.onbeforeunload = function(e) {
        var _return = null;
        for(var i = 0;i<__onbeforeunload__.length;i++){
            var t = __onbeforeunload__[i].apply(this,[e]);
            if(t)_return = t;
        }
        if(is_string(_return))return _return;
    };
    extendObject("_getEventList_",function(eve){
        if(this.frwEvent&&this.frwEvent[eve])return this.frwEvent[eve];
        else return null;
    })
    extendObject("addEvent",function(eve,funct){
        if (typeof funct != 'function')throw "Wrong Arguments";
        if (typeof eve != 'string')throw "Wrong Arguments";
        var has = false;
        var self = this;
        if((self==document||is_window(self))&&eve=="load"){
            hlod=true;
            __loadfunctions__.push(funct);
            return;
        }
        if((self==document||is_window(self))&&eve=="beforeunload"){
            hlod=true;
            __onbeforeunload__.push(funct);
            return;
        }
        eve=eve.toLowerCase();
        if(eve == 'ready' || eve == 'domcontentloaded'){
            hready = true;
            function f(e){
                hasloadReady = true;
                var evt = (e)?e:window.event;
                self.frwEvent[eve].each(function(i,elm){try{this.fn.apply(self,[evt,this.fn]);}catch(e){debugger;console.error(e);}},false);
                if(hasloadLoad)__loadfunction__.apply(window,[eve]);
            }
            if(!this.frwEvent)this.frwEvent={};
            if(!this.frwEvent[eve]){
                this.frwEvent[eve]=[];
                has=true;
            }
            this.frwEvent[eve].push({
                fn : funct
            });
            if(this.frwEvent[eve].length==1)(function(i) {
                var ie = /*@cc_on!@*/false;
                if (ie) {
                    (function (){
                        var tempNode = document.createElement('document:ready');
                        var tmp = null;
                        try {
                            tempNode.doScroll('left');
                            try{
                                i();
                            }catch(e){
                                tmp = e.message;
                                throw "error";
                            }
                            tempNode = null;
                        } catch(e) {
                            if(tmp) throw tmp;
                            else setTimeout(arguments.callee, 0);
                        }
                    })();
                } else document.addEventListener("DOMContentLoaded",i,false);
            })(f);
            return;
        }
        if(eve == 'hashchange'){
            if(!is_window(this))return;
            if((!isEventSupported('hashchange'))||browser.IE)addOnHashChange(funct);
            else{
                if(!this.addEventListener){
                    this.attachEvent('on'+eve,funct);
                }else{
                    this.addEventListener(eve,funct,false);
                }
            }
            return;
        }
        if(!this.frwEvent)this.frwEvent={};
        if(!this.frwEvent[eve]){
            this.frwEvent[eve]=[];
            has=true;
        }
        if(eve=="afterload"){
            if(!window.frwEvent)window.frwEvent={};
            if(!window.frwEvent[eve])window.frwEvent[eve]=[];
            window.frwEvent[eve].push({fn : funct});
            if(!document.frwEvent)window.frwEvent={};
            if(!document.frwEvent[eve])document.frwEvent[eve]=[];
            document.frwEvent[eve].push({fn : funct});
        }else{
            this.frwEvent[eve].push({
                fn : funct
            });
        }
        if(has){
            var hld = function(e){
                var res = undefined;
                var evt = (e)?e:window.event;
                for(var i=0;i<self.frwEvent[eve].length;i++){
                    try{
                        var rs = self.frwEvent[eve][i].fn.apply(self,[evt,self.frwEvent[eve][i].fn]);
                        if(rs!=undefined)res = rs;
                    }catch(e){console.error(e);}
                }
                return res;
            }
            try{
                if(eve == 'scroll' || eve == 'wheel' || eve == 'dommouseScroll'){
                    if (this.addEventListener) {
                        this.addEventListener ("mousewheel", hld, false);
                        this.addEventListener ("DOMMouseScroll", hld, false);
                    }else if (this.attachEvent) this.attachEvent ("onmousewheel", hld);
                    return;
                }
                if(!this.addEventListener){
                    this.attachEvent('on'+eve,hld);
                }else{
                    this.addEventListener(eve,hld,false);
                }
            }catch(e){}
        }
    });
    extendObject("removeEvent",function(eve,funct){
        if(funct==undefined&&is_array(this.frwEvent[eve])){
            this.frwEvent[eve] = [];
            return;
        }
        if (typeof funct != 'function')return;
        eve=eve.toLowerCase();
        function remove(fn){
            try{
                if(!this.removeEventListener){
                    this.detachEvent('on'+eve,fn);
                }else{
                    this.removeEventListener(eve,fn,false);
                }
            }catch(e){}
        }
        if(!this.frwEvent)return remove(funct);
        if(!is_array(this.frwEvent[eve]))return remove(funct);
        var t = this.frwEvent[eve].find(function(){return this.fn==funct;});
        if(t==-1)return remove(funct);
        else{this.frwEvent[eve].removeIndex(t);/*return remove(this.frwEvent[eve][t].hld);*/}
    });
    extendObject("find",function(selector){
        if(!is_node(this))return [];
        var data = [];
        try{
            data = xfind(selector,this);
        }catch(e){}
        return browser.IE?each(data,function(){fixIE(this);}):data;
    });
    extendObject("getHeight",function(){
        if(is_window(this))return window.pageHeight();
        if(this==document)return window.pageHeight();
        if (this.style.pixelHeight) {
            var s = parseFloat(this.getStyle("border-top-width"));
            if(isNaN(s))s=0;
            var t =  parseFloat(this.getStyle("border-bottom-width"));
            if(isNaN(t))t=0;
            xPos = this.style.pixelHeight + s + t;
        } else {
            xPos = this.offsetHeight;
        }
        return xPos;
    });
    extendObject("getWidth",function() {
        if(is_window(this))return window.pageWidth();
        if(this==document)return window.pageWidth();
        if (this.style.pixelWidth) {
            var s = parseFloat(this.getStyle("border-left-width"));
            if(isNaN(s))s=0;
            var t =  parseFloat(this.getStyle("border-right-width"));
            if(isNaN(t))t=0;
            xPos = this.style.pixelWidth + s + t;
        } else {
            xPos = this.offsetWidth;
        }
        return xPos;
    });
    function __getStyle__(el, styleProp) {
        var value, defaultView = (el.ownerDocument || document).defaultView;
        // W3C standard way:
        if (defaultView && defaultView.getComputedStyle) {
            // sanitize property name to css notation
            // (hypen separated words eg. font-Size)
            styleProp = styleProp.replace(/([A-Z])/g, "-$1").toLowerCase();
            return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
        } else if (el.currentStyle) { // IE
            // sanitize property name to camelCase
            styleProp = styleProp.replace(/\-(\w)/g, function(str, letter) {
                return letter.toUpperCase();
            });
            value = el.currentStyle[styleProp];
            // convert other units to pixels on IE
            if (/^\d+(em|pt|%|ex)?$/i.test(value)) {
                return (function(value) {
                    var oldLeft = el.style.left, oldRsLeft = el.runtimeStyle.left;
                    el.runtimeStyle.left = el.currentStyle.left;
                    el.style.left = value || 0;
                    value = el.style.pixelLeft + "px";
                    el.style.left = oldLeft;
                    el.runtimeStyle.left = oldRsLeft;
                    return value;
                })(value);
            }
            var t =  value;
            if(styleProp.toLowerCase() == "opacity"){
                if(!t){
                    if(el.filters)if(el.filters.alpha)t = el.filters.alpha.opacity/100;
                    if(!t)t = "1";
                    else t = t.toString();
                }
            }
            return t;
        }
    }
    extendObject("getStyle",function(strCssRule){
        return __getStyle__(this,strCssRule);
    });
    extendObject("findPosX",function(){
        var curleft = 0;
        var obj = this;
        if(obj.offsetParent)
            while(1){
                curleft += obj.offsetLeft;
                if(!obj.offsetParent)break;
                obj = obj.offsetParent;
                if(obj.getStyle("position")=="relative")break;
            }
        else if(obj.x)curleft += obj.x;
        return curleft;
    });
    extendObject("empty",function(){
        if(this===document || this===window)return;
        if(!is_node(this))return;
        if(this.tagName=="TABLE"){
            var elms = this.getElementsByTagName("TR");
            var t = elms.length;
            for(var i=0;i<t;i++){
                if(!elms[0].remove)fixIE(elms[0]);
                elms[0].remove();
            }
        }else{
            while(this.hasChildNodes()){
                this.removeChild(this.firstChild);
            }
        }
    });
    extendObject("findPosY",function(){
        var curtop = 0;
        var obj = this;
        if(obj.offsetParent)
            while(1){
                curtop += obj.offsetTop;
                if(!obj.offsetParent)break;
                obj = obj.offsetParent;
                if(obj.getStyle("position")=="relative")break;
            }
        else if(obj.y)curtop += obj.y;
        return curtop;
    });
    var findAbsPos=(function(){
        function __getIEVersion() {
            var rv = -1; // Return value assumes failure.
            if (navigator.appName == 'Microsoft Internet Explorer') {
                var ua = navigator.userAgent;
                var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
                if (re.exec(ua) != null)
                    rv = parseFloat(RegExp.$1);
            }
            return rv;
        }

        function __getOperaVersion() {
            var rv = 0; // Default value
            if (window.opera) {
                var sver = window.opera.version();
                rv = parseFloat(sver);
            }
            return rv;
        }

        var __userAgent = navigator.userAgent;
        var __isIE =  navigator.appVersion.match(/MSIE/) != null;
        var __IEVersion = __getIEVersion();
        var __isIENew = __isIE && __IEVersion >= 8;
        var __isIEOld = __isIE && !__isIENew;

        var __isFireFox = __userAgent.match(/firefox/i) != null;
        var __isFireFoxOld = __isFireFox && ((__userAgent.match(/firefox\/2./i) != null) ||
            (__userAgent.match(/firefox\/1./i) != null));
        var __isFireFoxNew = __isFireFox && !__isFireFoxOld;

        var __isWebKit =  navigator.appVersion.match(/WebKit/) != null;
        var __isChrome =  navigator.appVersion.match(/Chrome/) != null;
        var __isOpera =  window.opera != null;
        var __operaVersion = __getOperaVersion();
        var __isOperaOld = __isOpera && (__operaVersion < 10);

        function __parseBorderWidth(width) {
            var res = 0;
            if (typeof(width) == "string" && width != null && width != "" ) {
                var p = width.indexOf("px");
                if (p >= 0) {
                    res = parseInt(width.substring(0, p));
                }
                else {
                    //do not know how to calculate other values
                    //(such as 0.5em or 0.1cm) correctly now
                    //so just set the width to 1 pixel
                    res = 1;
                }
            }
            return res;
        }

//returns border width for some element
        function __getBorderWidth(element) {
            var res = new Object();
            res.left = 0; res.top = 0; res.right = 0; res.bottom = 0;
            if (window.getComputedStyle) {
                //for Firefox
                var elStyle = window.getComputedStyle(element, null);
                res.left = parseInt(elStyle.borderLeftWidth.slice(0, -2));
                res.top = parseInt(elStyle.borderTopWidth.slice(0, -2));
                res.right = parseInt(elStyle.borderRightWidth.slice(0, -2));
                res.bottom = parseInt(elStyle.borderBottomWidth.slice(0, -2));
            }
            else {
                //for other browsers
                res.left = __parseBorderWidth(element.style.borderLeftWidth);
                res.top = __parseBorderWidth(element.style.borderTopWidth);
                res.right = __parseBorderWidth(element.style.borderRightWidth);
                res.bottom = __parseBorderWidth(element.style.borderBottomWidth);
            }

            return res;
        }

//returns the absolute position of some element within document
        function getElementAbsolutePos(element) {
            var res = new Object();
            res.x = 0; res.y = 0;
            if (element !== null) {
                if (element.getBoundingClientRect) {
                    var viewportElement = document.documentElement;
                    var box = element.getBoundingClientRect();
                    var scrollLeft =  + document.body.scrollLeft+ document.documentElement.scrollLeft;
                    var scrollTop =  + document.body.scrollTop + document.documentElement.scrollTop;

                    res.x = box.left + scrollLeft;
                    res.y = box.top + scrollTop;

                }
                else { //for old browsers
                    res.x = element.offsetLeft;
                    res.y = element.offsetTop;

                    var parentNode = element.parentNode;
                    var borderWidth = null;

                    while (offsetParent != null) {
                        res.x += offsetParent.offsetLeft;
                        res.y += offsetParent.offsetTop;

                        var parentTagName =
                            offsetParent.tagName.toLowerCase();

                        if ((__isIEOld && parentTagName != "table") ||
                            ((__isFireFoxNew || __isChrome) &&
                                parentTagName == "td")) {
                            borderWidth = kGetBorderWidth
                            (offsetParent);
                            res.x += borderWidth.left;
                            res.y += borderWidth.top;
                        }

                        if (offsetParent != document.body &&
                            offsetParent != document.documentElement) {
                            res.x -= offsetParent.scrollLeft;
                            res.y -= offsetParent.scrollTop;
                        }



                        //next lines are necessary to fix the problem
                        //with offsetParent
                        if (!__isIE && !__isOperaOld || __isIENew) {
                            while (offsetParent != parentNode &&
                                parentNode !== null) {
                                res.x -= parentNode.scrollLeft;
                                res.y -= parentNode.scrollTop;
                                if (__isFireFoxOld || __isWebKit)
                                {
                                    borderWidth =
                                        kGetBorderWidth(parentNode);
                                    res.x += borderWidth.left;
                                    res.y += borderWidth.top;
                                }
                                parentNode = parentNode.parentNode;
                            }
                        }

                        parentNode = offsetParent.parentNode;
                        offsetParent = offsetParent.offsetParent;
                    }
                }
            }
            return res;
        }
        return getElementAbsolutePos;
    })();
    extendObject("findAbsPosX",function(){
        return findAbsPos(this).x;
    });
    extendObject("findAbsPosY",function(){
        return findAbsPos(this).y;
    });
    extendObject("findAbsPos",function(){
        return findAbsPos(this);
    });
    extendObject("getText",function(){
        if(this.tagName=="DIV"){
            if(this.innerText!=undefined)return this.innerText;
            else if(this.textContent!=undefined) return this.textContent;
            else return "";
        }
        if (this.textContent!=undefined)return this.textContent;
        else return this.innerText;
    });
    extendObject("shutEvent",function(event,e){
        event = event.toLowerCase();

        if(!this.eventSupported(event)){
            var self = this;
            if(self.frwEvent){
                if(self.frwEvent[event]){
                    for(var i=0;i<self.frwEvent[event].length;i++){
                        try{self.frwEvent[event][i].fn.apply(self,[e?e:window.event,self.frwEvent[event][i].fn]);}catch(e){console.error(e);}
                    }
                } else return false;
            } else return false;
            return true;
        }

        if(is_window(this)&&event=="resize"){
            var self = this;
            if(self.frwEvent){
                if(self.frwEvent[event]){
                    setTimeout(function(){
                        for(var i=0;i<self.frwEvent[event].length;i++){
                            try{self.frwEvent[event][i].fn.apply(self,[window.event,self.frwEvent[event][i].fn]);}catch(e){console.error(e);}
                        }
                    },is_window(this)&&event=="resize"?50:1);
                } else return false;
            } else return false;
            return true;
        }
        if (document.createEventObject&&browser.version<9){
            var evt = document.createEventObject();
            return this.fireEvent('on'+event,e?e:evt);
        }else{
            var evt = document.createEvent("HTMLEvents");
            evt.initEvent(event, true, true );
            return !this.dispatchEvent(e?e:evt);
        }
    });
    window.getScrollBarWidth=function() {
        var inner = document.createElement('p');
        inner.style.width = "100%";
        inner.style.height = "200px";
        var outer = document.createElement('div');
        outer.style.position = "absolute";
        outer.style.top = "0px";
        outer.style.left = "0px";
        outer.style.visibility = "hidden";
        outer.style.width = "200px";
        outer.style.height = "150px";
        outer.style.overflow = "hidden";
        outer.appendChild (inner);
        document.body.appendChild (outer);
        var w1 = inner.offsetWidth;
        outer.style.overflow = 'scroll';
        var w2 = inner.offsetWidth;
        if (w1 == w2) w2 = outer.clientWidth;
        document.body.removeChild (outer);
        return (w1 - w2);
    };
    extendObject("getElementsByClassName",function(classname, tagname) {
        if (!tagname) tagname = "*";
        var a = [];
        var re = new RegExp('\\b' + classname + '\\b');
        var els = this.getElementsByTagName(tagname);
        for(var i=0,j=els.length; i<j; i++)
            if(re.test(els[i].className||els[i].getAttribute("class")))a.push(els[i]);
        if(!yes){
            for (i=0;i<a.length;i++)
                for (method in window.Element)(a[i])[method] = window.Element[method];
        }
        return a;
    });
    extendObject("remove",function() {
        if(this===document || this===window)return;
        if(!is_node(this))return;
        if(this.parentNode)this.parentNode.removeChild( this );
        return this;
    });
    window.IEFindElement=function(obj){
        if(typeof(obj)!='object')throw('Is not a object');
        for (method in this.Element)obj[method] = this.Element[method];
        return obj;
    };
    function f_filterResults(n_win, n_docel, n_body) {
        var n_result = n_win ? n_win : 0;
        if (n_docel && (!n_result || (n_result > n_docel)))n_result = n_docel;
        return n_body && (!n_result ) ? n_body : n_result;
    }
    window.pageWidth=function() {
        return f_filterResults(window.innerWidth ? window.innerWidth : 0,document.documentElement ? document.documentElement.clientWidth : 0,document.body ? document.body.clientWidth : 0);
    };
    window.pageHeight=function() {
        return f_filterResults (window.innerHeight ? window.innerHeight : 0,document.documentElement ? document.documentElement.clientHeight : 0,document.
            body ? document.body.clientHeight : 0);
    };
    window.pageFullWidth=function() {
        var D = document;
        return Math.max(Math.max(D.body.scrollWidth,    D.documentElement.scrollWidth), Math.max(D.body.offsetWidth, D.documentElement.offsetWidth), Math.max(D.body.clientWidth, D.documentElement.clientWidth));
    };
    window.pageFullHeight=function() {
        var D = document;
        return Math.max(Math.max(D.body.scrollHeight,    D.documentElement.scrollHeight), Math.max(D.body.offsetHeight, D.documentElement.offsetHeight), Math.max(D.body.clientHeight, D.documentElement.clientHeight));
    };
    window.getScrollLeft = function() {
        function f(n_win, n_docel, n_body) {
            var n_result = n_win ? n_win : 0;
            if (n_docel && (!n_result || (n_result > n_docel)))
                n_result = n_docel;
            return n_body && (!n_result || (n_result > n_body)) ? n_body : n_result;
        }
        return f (
            window.pageXOffset ? window.pageXOffset : 0,
            document.documentElement ? document.documentElement.scrollLeft : 0,
            document.body ? document.body.scrollLeft : 0
        );
    }
    window.getScrollTop=function () {
        function f(n_win, n_docel, n_body) {
            var n_result = n_win ? n_win : 0;
            if (n_docel && (!n_result || (n_result > n_docel)))
                n_result = n_docel;
            return n_body && (!n_result || (n_result > n_body)) ? n_body : n_result;
        }
        return f (
            window.pageYOffset ? window.pageYOffset : 0,
            document.documentElement ? document.documentElement.scrollTop : 0,
            document.body ? document.body.scrollTop : 0
        );
    }
    window.httpRequest=function(){
        var ajax = false;
        if (this.ActiveXObject){ // pero si es IE
            try {
                ajax = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e){
                try{
                    ajax = new ActiveXObject("Microsoft.XMLHTTP");
                }catch (e){}
            }
        } else if (this.XMLHttpRequest) {// Si es Mozilla, Safari etc
            ajax = new XMLHttpRequest();
        }else return false;
        return ajax;
    };
    function addOnHashChange(func){
        hashFunctions.push(function(e){func(e);});
        if(hashFunctions.length==1){
            var fun = function(){
                var tmp = window.location.href.replace( /^[^#]*#?(.*)$/, '$1' ).toLowerCase();
                if (tmp!=linkHash){
                    hashFunctions.each(function(){
                        try{this.apply(window,[tmp,linkHash]);}catch(e){console.error(e);}
                    },false);
                    linkHash=tmp;
                }
                setTimeout(fun,10);
            }
            setTimeout(fun,10);
        }
    };
    window.toINT=function (value){
        var s =parseInt(value);
        if(isNaN(s))return 0;
        else return s;
    }
    window.disableSelection=function(target){
        if (typeof target.onselectstart!='undefined') //IE route
            target.onselectstart=function(){return false}
        else if (typeof target.style.MozUserSelect!='undefined') //Firefox route
            target.style.MozUserSelect='none'
        else //All other route (ie: Opera)
            target.onmousedown=function(){return false}
        target.style.cursor = 'default';
    }
    window.enableSelection=function(target){
        if (typeof target.onselectstart!='undefined') //IE route
            target.onselectstart=function(){return true}
        else if (typeof target.style.MozUserSelect!='undefined') //Firefox route
            target.style.MozUserSelect="text";
        else //All other route (ie: Opera)
            target.onmousedown=function(){return true}
        target.style.cursor = 'auto';
    }
    window.fixIE = function (el) {
        for (method in window.Element){
            try {
                el[method] = window.Element[method];
            }catch(e){console.log(method + " No Added");}
        }
    }
    window.e_preventDefault= function (e) {
        if (e.preventDefault) e.preventDefault();
        else e.returnValue = false;
    }
    window.e_stopPropagation=function(e) {
        if (e.stopPropagation) e.stopPropagation();
        else e.cancelBubble = true;
    }
    window.e_stop = function(e){e_preventDefault(e); e_stopPropagation(e);}
    String.prototype.regexIndexOf = function(regex, startpos) {
        var indexOf = this.substring(startpos || 0).search(regex);
        return (indexOf >= 0) ? (indexOf + (startpos || 0)) : indexOf;
    }
    window.Cookies = {
        init: function () {
            var allCookies = document.cookie.split('; ');
            for (var i=0;i<allCookies.length;i++) {
                var cookiePair = allCookies[i].split('=');
                this[cookiePair[0]] = cookiePair[1];
            }
        },
        create: function (name,value,days) {
            if (days) {
                var date = new Date();
                date.setTime(date.getTime()+(days*24*60*60*1000));
                var expires = "; expires="+date.toGMTString();
            }
            else var expires = "";
            document.cookie = name+"="+value+expires+"; path=/";
            this[name] = value;
        },
        erase: function (name) {
            this.create(name,'',-1);
            this[name] = undefined;
        }
    };Cookies.init();
    String.prototype.regexLastIndexOf = function(regex, startpos) {
        regex = (regex.global) ? regex : new RegExp(regex.source, "g" + (regex.ignoreCase ? "i" : "") + (regex.multiLine ? "m" : ""));
        if(typeof (startpos) == "undefined") {
            startpos = this.length;
        } else if(startpos < 0) {
            startpos = 0;
        }
        var stringToWorkWith = this.substring(0, startpos + 1);
        var lastIndexOf = -1;
        var nextStop = 0;
        while((result = regex.exec(stringToWorkWith)) != null) {
            lastIndexOf = result.index;
            regex.lastIndex = ++nextStop;
        }
        return lastIndexOf;
    }
    Function.prototype.construct = function (aArgs) {
        var fConstructor = this, fNewConstr = function () { fConstructor.apply(this, aArgs); };
        fNewConstr.prototype = fConstructor.prototype;
        return new fNewConstr();
    };
    String.prototype.trim= function() {
        var	str = this.replace(/^\s\s*/, ''),
            ws = /\s/,
            i = str.length;
        while (ws.test(str.charAt(--i)));
        return str.slice(0, i + 1);
    }
    String.prototype.truncate = function(d,a) {
        if (this.length <= d)
            return this.toString();

        var xMaxFit = d - 3;
        var xTruncateAt = this.lastIndexOf(' ', xMaxFit);
        if (xTruncateAt == -1 || xTruncateAt < d / 2)
            xTruncateAt = xMaxFit;

        return this.substr(0, xTruncateAt) + (a?a:'\u2026');
    };
    String.prototype.toElement=function(){
        var tmp = document.createElement("div");
        tmp.innerHTML = this;
        return tmp.childNodes;
    }
    String.prototype.trunc = function(n,a,useWordBoundary){
        if(useWordBoundary==undefined)useWordBoundary = true;
        var toLong = this.length>n,s_ = toLong ? this.substr(0,n-1) : this;
        s_ = useWordBoundary && toLong ? s_.substr(0,s_.lastIndexOf(' ')) : s_;
        return  toLong ? s_ + (a?a:'\u2026') : s_;
    };
    //function (d,a){var c=this.toString();d&&c.length>d&&(c=c.substr(0,d)+(a?a:'\u2026'));return c}
    String.prototype.fullTrim= function() {
        return this.replace(/[\t\v\f\r\n \u00a0\u2000-\u200b\u2028-\u2029\u3000]+/g," ").trim();
    }
    String.prototype.toAbs = function toAbs(host) {
        var link = this;
        var lparts = link.split('/');
        if (/http:|https:|ftp:|file:/.test(lparts[0]))return link;// already abs, return
        var i, hparts = host.split('/');
        if (hparts.length > 3)hparts.pop(); // strip trailing thingie, either scriptname or blank
        if (lparts[0] === '') { // like "/here/dude.png"
            host = hparts[0] + '//' + hparts[2];
            hparts = host.split('/'); // re-split host parts from scheme and domain only
            delete lparts[0];
        }
        for(i = 0; i < lparts.length; i++) {
            if (lparts[i] === '..') {
                // remove the previous dir level, if exists
                if (typeof lparts[i - 1] !== 'undefined') {
                    delete lparts[i - 1];
                } else if (hparts.length > 3) { // at least leave scheme and domain
                    hparts.pop(); // stip one dir off the host for each /../
                }
                delete lparts[i];
            }
            if(lparts[i] === '.') {
                delete lparts[i];
            }
        }
        // remove deleted
        var newlinkparts = [];
        for (i = 0; i < lparts.length; i++) {
            if (typeof lparts[i] !== 'undefined') {
                newlinkparts[newlinkparts.length] = lparts[i];
            }
        }
        return hparts.join('/') + '/' + newlinkparts.join('/');
    }
    String.prototype.capitaliseFirstLetter = function(){
        string = this.toLowerCase();
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    String.prototype.testPassword= function(){
        var intScore=0;
        if (this.length<5) intScore = (intScore+3);
        else if (this.length>4 && this.length<8) intScore = (intScore+6);
        else if (this.length>7 && this.length<16) intScore = (intScore+12);
        else if (this.length>15) intScore = (intScore+18);
        if (this.match(/[a-z]/))intScore = (intScore+1);
        if (this.match(/[A-Z]/))intScore = (intScore+5);
        if (this.match(/\d+/))intScore = (intScore+5);
        if (this.match(/(.*[0-9].*[0-9].*[0-9])/))intScore = (intScore+5);
        if (this.match(/.[!,@,#,$,%,^,&,*,?,_,~]/))intScore = (intScore+5);
        if (this.match(/(.*[!,@,#,$,%,^,&,*,?,_,~].*[!,@,#,$,%,^,&,*,?,_,~])/))intScore = (intScore+5);
        if (this.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/))intScore = (intScore+2);
        if (this.match(/([a-zA-Z])/) && this.match(/([0-9])/))intScore = (intScore+2);
        if (this.match(/([a-zA-Z0-9].*[!,@,#,$,%,^,&,*,?,_,~])|([!,@,#,$,%,^,&,*,?,_,~].*[a-zA-Z0-9])/))intScore = (intScore+2);
        if(intScore < 16) return 1;
        else if (intScore > 15 && intScore < 25) return 2;
        else if (intScore > 24 && intScore < 35) return 3;
        else if (intScore > 34 && intScore < 45) return 4;
        else return 5;
    };

    // Super amazing, cross browser property function, based on http://thewikies.com/
    function addProperty( name, onGet, onSet) {
        obj = this;
        // wrapper functions
        var
            oldValue = obj[name],
            getFn = function () {
                return onGet.apply(obj, [oldValue]);
            },
            setFn = function (newValue) {
                return oldValue = onSet.apply(obj, [newValue]);
            };
        // Modern browsers, IE9+, and IE8 (must be a DOM object),
        if (Object.defineProperty && (!browser.IE||browser.version>8)) {
            Object.defineProperty(obj, name, {
                get: getFn,
                set: setFn
            });
            // Older Mozilla
        } else if (obj.__defineGetter__) {
            obj.__defineGetter__(name, getFn);
            obj.__defineSetter__(name, setFn);
            // IE6-7
            // must be a real DOM object (to have attachEvent) and must be attached to document (for onpropertychange to fire)
        } else {
            var onPropertyChange = function (e) {
                if (event.propertyName == name) {
                    // temporarily remove the event so it doesn't fire again and create a loop
                    obj.detachEvent("onpropertychange", onPropertyChange);
                    // get the changed value, run it through the set function
                    var newValue = setFn(obj[name]);
                    // restore the get function
                    obj[name] = getFn;
                    obj[name].toString = getFn;
                    // restore the event
                    obj.attachEvent("onpropertychange", onPropertyChange);
                }
            };
            obj[name] = getFn;
            obj[name].toString = getFn;
            try{
                obj.attachEvent("onpropertychange", onPropertyChange);
            }catch(e){
                (function(){
                    var _value = getFn();
                    obj[name] = _value;
                    setInterval(function(){
                        if(obj[name]!=_value){
                            var newValue = setFn(obj[name]);
                            // restore the get function
                            _value = obj[name] = getFn();
                        }
                    },50);
                })();
            }
        }
    }
    extendObject("addProperty",addProperty,true);

    Function.prototype._inherit_ = function (superCls) {
        // We use an intermediary empty constructor to create an
        // inheritance chain, because using the super class' constructor
        // might have side effects.
        var construct = function () {};
        construct.prototype = superCls.prototype;
        this.prototype = new construct;
        this.prototype.constructor = this;
        this.__super__ = superCls;
    }

    if (!Date.now) {
        Date.now = function now() {
            return new Date().getTime();
        };
    }

    window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;

    (function() {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                || window[vendors[x]+'CancelRequestAnimationFrame'];
        }
        if (!window.requestAnimationFrame)
            window.requestAnimationFrame = function(callback, element) {
                var id = window.setTimeout(function() { callback(1000/60); },1000/60);
                return id;
            };
        if (!window.cancelAnimationFrame)window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }());

    (function() {
        var fullScreenApi = {
                supportsFullScreen: false,
                isFullScreen: function() { return false; },
                requestFullScreen: function() {},
                cancelFullScreen: function() {},
                fullScreenEventName: '',
                prefix: ''
            },
            browserPrefixes = 'webkit moz o ms khtml'.split(' ');
        // check for native support
        if (typeof document.cancelFullScreen != 'undefined')fullScreenApi.supportsFullScreen = true;
        else {
            // check for fullscreen support by vendor prefix
            for (var i = 0, il = browserPrefixes.length; i < il; i++ ) {
                fullScreenApi.prefix = browserPrefixes[i];
                if (typeof document[fullScreenApi.prefix + 'CancelFullScreen' ] != 'undefined' ) {
                    fullScreenApi.supportsFullScreen = true;
                    break;
                }
            }
        }
        // update methods to do something useful
        if (fullScreenApi.supportsFullScreen) {
            fullScreenApi.fullScreenEventName = fullScreenApi.prefix + 'fullscreenchange';
            fullScreenApi.isFullScreen = function() {
                switch (this.prefix) {
                    case '':
                        return document.fullScreen;
                    case 'webkit':
                        return document.webkitIsFullScreen;
                    default:
                        return document[this.prefix + 'FullScreen'];
                }
            }
            fullScreenApi.requestFullScreen = function(el) {
                return (this.prefix === '') ? el.requestFullScreen() : el[this.prefix + 'RequestFullScreen']();
            }
            fullScreenApi.cancelFullScreen = function(el) {
                return (this.prefix === '') ? document.cancelFullScreen() : document[this.prefix + 'CancelFullScreen']();
            }
        }
        // export api
        window.fullScreenApi = fullScreenApi;
    })();

    extendObject("isVisible",function(){
        obj = this
        if (obj == document) return true
        if (obj == window) return true
        if (!obj) return false
        if (!obj.parentNode) return false
        if (obj.style) {
            if (obj.style.display == 'none') return false
            if (obj.style.visibility == 'hidden') return false
        }
        if (window.getComputedStyle) {
            var style = window.getComputedStyle(obj, "")
            if (style.display == 'none') return false
            if (style.visibility == 'hidden') return false
        }
        var style = obj.currentStyle
        if (style) {
            if (style['display'] == 'none') return false
            if (style['visibility'] == 'hidden') return false
        }
        return isVisible(obj.parentNode)
    });
    Number.prototype.zeroPad = function (count) {
        if(!is_number(count))return this.toString();
        if(count>21){
            var number = this.toString();
            leng = count - number.length;
            for (i=0;i<leng;i++)number="0"+number;
            return number;
        }
        return [Math.pow(10, count - this.toString().length), this].join('').substr(1);
    };

    window.Activity = (function(){
        var fun = function(attr){
            var atr = {
                idleTime:600000,
                onActive:null,
                onIdle:null
            }
            for (var key in attr)atr[key] = attr[key];
            var timer = null;
            var isIdle = false;
            var active = function (e){
                if(timer){
                    clearTimeout(timer);
                    timer = null;
                }
                if(isIdle&&is_function(atr.onActive)){
                    isIdle = false;
                    try{
                        atr.onActive.apply(window,[]);
                    }catch(e){}
                }
                timer = setTimeout(function (){
                    isIdle = true;
                    if(is_function(atr.onIdle)){
                        try{
                            atr.onIdle.apply(window,[]);
                        }catch(e){}
                    }
                },atr.idleTime);
            };
            if(!document.body.addEvent)fixIE(document.body);
            (function(){
                if (browser.IE&&browser.version<9)return document.body;
                else return window;
            })().addEvent("mousemove",active);
            (function(){
                if (browser.IE&&browser.version<9)return document.body;
                else return window;
            })().addEvent("scroll",active);
            (function(){
                if (browser.IE&&browser.version<9)return document.body;
                else return window;
            })().addEvent("keydown",active);
            (function(fn) {
                if(browser.IE&&browser.version==9)window.addEvent("focusin",fn);
                else if(browser.IE&&browser.version<9)document.addEvent("focusin",fn);
                else window.addEvent("focus",fn);
            })(active);
            active();
        }
        return fun;
    })();

    (function(){
        /**
         * I ? Google
         */
        String.prototype.stripNonNumeric = function() {
            var str = this + '';
            var rgx = /^\d|\.|-$/;
            var out = '';
            for( var i = 0; i < str.length; i++ ) {
                if( rgx.test( str.charAt(i) ) ) {
                    if( !( ( str.charAt(i) == '.' && out.indexOf( '.' ) != -1 ) ||
                        ( str.charAt(i) == '-' && out.length != 0 ) ) ) {
                        out += str.charAt(i);
                    }
                }
            }
            return out;
        };

        /**
         * Formats the number according to the 'format' string; adherses to the american number standard where a comma is inserted after every 3 digits.
         *  note: there should be only 1 contiguous number in the format, where a number consists of digits, period, and commas
         *        any other characters can be wrapped around this number, including '$', '%', or text
         *        examples (123456.789):
         *          '0' - (123456) show only digits, no precision
         *          '0.00' - (123456.78) show only digits, 2 precision
         *          '0.0000' - (123456.7890) show only digits, 4 precision
         *          '0,000' - (123,456) show comma and digits, no precision
         *          '0,000.00' - (123,456.78) show comma and digits, 2 precision
         *          '0,0.00' - (123,456.78) shortcut method, show comma and digits, 2 precision
         *
         * @method format
         * @param format {string} the way you would like to format this text
         * @return {string} the formatted number
         * @public
         */
        Number.prototype.format = function(format) {
            if (!(typeof format == "string")) {return '';} // sanity check

            var hasComma = -1 < format.indexOf(','),
                psplit = format.stripNonNumeric().split('.'),
                that = this;

            // compute precision
            if (1 < psplit.length) {
                // fix number precision
                that = that.toFixed(psplit[1].length);
            }
            // error: too many periods
            else if (2 < psplit.length) {
                throw('NumberFormatException: invalid format, formats should have no more than 1 period: ' + format);
            }
            // remove precision
            else {
                that = that.toFixed(0);
            }

            // get the string now that precision is correct
            var fnum = that.toString();

            // format has comma, then compute commas
            if (hasComma) {
                // remove precision for computation
                psplit = fnum.split('.');

                var cnum = psplit[0],
                    parr = [],
                    j = cnum.length,
                    m = Math.floor(j / 3),
                    n = cnum.length % 3 || 3; // n cannot be ZERO or causes infinite loop

                // break the number into chunks of 3 digits; first chunk may be less than 3
                for (var i = 0; i < j; i += n) {
                    if (i != 0) {n = 3;}
                    parr[parr.length] = cnum.substr(i, n);
                    m -= 1;
                }

                // put chunks back together, separated by comma
                fnum = parr.join(',');

                // add the precision back in
                if (psplit[1]) {fnum += '.' + psplit[1];}
            }

            // replace the number portion of the format with fnum
            return format.replace(/[\d,?\.?]+/, fnum);
        };

        window.number_format = function(number, decimals, dec_point, thousands_sep) {
            number = (number + '')
                .replace(/[^0-9+\-Ee.]/g, '');
            var n = !isFinite(+number) ? 0 : +number,
                prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
                sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
                dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
                s = '',
                toFixedFix = function(n, prec) {
                    var k = Math.pow(10, prec);
                    return '' + (Math.round(n * k) / k)
                        .toFixed(prec);
                };
            // Fix for IE parseFloat(0.55).toFixed(0) = 0;
            s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
                .split('.');
            if (s[0].length > 3) {
                s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
            }
            if ((s[1] || '')
                .length < prec) {
                s[1] = s[1] || '';
                s[1] += new Array(prec - s[1].length + 1)
                    .join('0');
            }
            return s.join(dec);
        }

    })();
    var json = undefined;
    try{
        json=JSON!=undefined?JSON:undefined;
    }catch(e){}
    if(!json){
        json={};(function(){function f(n){return n<10?"0"+n:n}if(typeof Date.prototype.tojson!=="function"){Date.prototype.tojson=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null};String.prototype.tojson=Number.prototype.tojson=Boolean.prototype.tojson=function(key){return this.valueOf()}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==="object"&&typeof value.tojson==="function"){value=value.tojson(key)}if(typeof rep==="function"){value=rep.call(holder,key,value)}switch(typeof value){case"string":return quote(value);case"number":return isFinite(value)?String(value):"null";case"boolean":case"null":return String(value);case"object":if(!value){return"null"}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==="[object Array]"){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||"null"}v=partial.length===0?"[]":gap?"[\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"]":"["+partial.join(",")+"]";gap=mind;return v}if(rep&&typeof rep==="object"){length=rep.length;for(i=0;i<length;i+=1){if(typeof rep[i]==="string"){k=rep[i];v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}else{for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}v=partial.length===0?"{}":gap?"{\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"}":"{"+partial.join(",")+"}";gap=mind;return v}}if(typeof json.stringify!=="function"){json.stringify=function(value,replacer,space){var i;gap="";indent="";if(typeof space==="number"){for(i=0;i<space;i+=1){indent+=" "}}else{if(typeof space==="string"){indent=space}}rep=replacer;if(replacer&&typeof replacer!=="function"&&(typeof replacer!=="object"||typeof replacer.length!=="number")){throw new Error("json.stringify")}return str("",{"":value})}}if(typeof json.parse!=="function"){json.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==="object"){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("json.parse")}}}());
    }
    window.JSONDencoder=json.parse;
    window.JSONEncoder=json.stringify;
    var xfind = (function(aa,s){var af,A,r,d,k,i=aa.document,l=i.documentElement,I="undefined",m=false,j=true,q=0,v=[].slice,ae=[].push,ai=("sizcache"+Math.random()).replace(".",""),L="[\\x20\\t\\r\\n\\f]",u="(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",t=u.replace("w","w#"),an="([*^$|!~]?=)",X="\\["+L+"*("+u+")"+L+"*(?:"+an+L+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+t+")|)|)"+L+"*\\]",ao=":("+u+")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|((?:[^,]|\\\\,|(?:,(?=[^\\[]*\\]))|(?:,(?=[^\\(]*\\))))*))\\)|)",N=":(nth|eq|gt|lt|first|last|even|odd)(?:\\((\\d*)\\)|)(?=[^-]|$)",p=L+"*([\\x20\\t\\r\\n\\f>+~])"+L+"*",o="(?=[^\\x20\\t\\r\\n\\f])(?:\\\\.|"+X+"|"+ao.replace(2,7)+"|[^\\\\(),])+",ag=new RegExp("^"+L+"+|((?:^|[^\\\\])(?:\\\\.)*)"+L+"+$","g"),R=new RegExp("^"+p),F=new RegExp(o+"?(?="+L+"*,|$)","g"),V=new RegExp("^(?:(?!,)(?:(?:^|,)"+L+"*"+o+")*?|"+L+"*(.*?))(\\)|$)"),al=new RegExp(o.slice(19,-6)+"\\x20\\t\\r\\n\\f>+~])+|"+p,"g"),W=/^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,ab=/[\x20\t\r\n\f]*[+~]/,aj=/:not\($/,B=/h\d/i,Y=/input|select|textarea|button/i,E=/\\(?!\\)/g,Q={ID:new RegExp("^#("+u+")"),CLASS:new RegExp("^\\.("+u+")"),NAME:new RegExp("^\\[name=['\"]?("+u+")['\"]?\\]"),TAG:new RegExp("^("+u.replace("[-","[-\\*")+")"),ATTR:new RegExp("^"+X),PSEUDO:new RegExp("^"+ao),CHILD:new RegExp("^:(only|nth|last|first)-child(?:\\("+L+"*(even|odd|(([+-]|)(\\d*)n|)"+L+"*(?:([+-]|)"+L+"*(\\d+)|))"+L+"*\\)|)","i"),POS:new RegExp(N,"ig"),needsContext:new RegExp("^"+L+"*[>+~]|"+N,"i")},ad={},C=[],x={},G=[],ak=function(e){e.sizzleFilter=true;return e},f=function(e){return function(ap){return ap.nodeName.toLowerCase()==="input"&&ap.type===e}},D=function(e){return function(aq){var ap=aq.nodeName.toLowerCase();return(ap==="input"||ap==="button")&&aq.type===e}},T=function(ap){var aq=false,at=i.createElement("div");try{aq=ap(at)}catch(ar){}at=null;return aq},z=T(function(ap){ap.innerHTML="<select></select>";var e=typeof ap.lastChild.getAttribute("multiple");return e!=="boolean"&&e!=="string"}),b=T(function(ap){ap.id=ai+0;ap.innerHTML="<a name='"+ai+"'></a><div name='"+ai+"'></div>";l.insertBefore(ap,l.firstChild);var e=i.getElementsByName&&i.getElementsByName(ai).length===2+i.getElementsByName(ai+0).length;k=!i.getElementById(ai);l.removeChild(ap);return e}),h=T(function(e){e.appendChild(i.createComment(""));return e.getElementsByTagName("*").length===0}),P=T(function(e){e.innerHTML="<a href='#'></a>";return e.firstChild&&typeof e.firstChild.getAttribute!==I&&e.firstChild.getAttribute("href")==="#"}),O=T(function(e){e.innerHTML="<div class='hidden e'></div><div class='hidden'></div>";if(!e.getElementsByClassName||e.getElementsByClassName("e").length===0){return false}e.lastChild.className="e";return e.getElementsByClassName("e").length!==1});var Z=function(ar,e,au,ax){au=au||[];e=e||i;var av,ap,aw,aq,at=e.nodeType;if(at!==1&&at!==9){return[]}if(!ar||typeof ar!=="string"){return au}aw=w(e);if(!aw&&!ax){if((av=W.exec(ar))){if((aq=av[1])){if(at===9){ap=e.getElementById(aq);if(ap&&ap.parentNode){if(ap.id===aq){au.push(ap);return au}}else{return au}}else{if(e.ownerDocument&&(ap=e.ownerDocument.getElementById(aq))&&M(e,ap)&&ap.id===aq){au.push(ap);return au}}}else{if(av[2]){ae.apply(au,v.call(e.getElementsByTagName(ar),0));return au}else{if((aq=av[3])&&O&&e.getElementsByClassName){ae.apply(au,v.call(e.getElementsByClassName(aq),0));return au}}}}}return ah(ar,e,au,ax,aw)};var S=Z.selectors={cacheLength:50,match:Q,order:["ID","TAG"],attrHandle:{},createPseudo:ak,find:{ID:k?function(ar,aq,ap){if(typeof aq.getElementById!==I&&!ap){var e=aq.getElementById(ar);return e&&e.parentNode?[e]:[]}}:function(ar,aq,ap){if(typeof aq.getElementById!==I&&!ap){var e=aq.getElementById(ar);return e?e.id===ar||typeof e.getAttributeNode!==I&&e.getAttributeNode("id").value===ar?[e]:s:[]}},TAG:h?function(e,ap){if(typeof ap.getElementsByTagName!==I){return ap.getElementsByTagName(e)}}:function(e,at){var ar=at.getElementsByTagName(e);if(e==="*"){var au,aq=[],ap=0;for(;(au=ar[ap]);ap++){if(au.nodeType===1){aq.push(au)}}return aq}return ar}},relative:{">":{dir:"parentNode",first:true}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:true},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){e[1]=e[1].replace(E,"");e[3]=(e[4]||e[5]||"").replace(E,"");if(e[2]==="~="){e[3]=" "+e[3]+" "}return e.slice(0,4)},CHILD:function(e){e[1]=e[1].toLowerCase();if(e[1]==="nth"){if(!e[2]){Z.error(e[0])}e[3]=+(e[3]?e[4]+(e[5]||1):2*(e[2]==="even"||e[2]==="odd"));e[4]=+((e[6]+e[7])||e[2]==="odd")}else{if(e[2]){Z.error(e[0])}}return e},PSEUDO:function(e){var ap,aq=e[4];if(Q.CHILD.test(e[0])){return null}if(aq&&(ap=V.exec(aq))&&ap.pop()){e[0]=e[0].slice(0,ap[0].length-aq.length-1);aq=ap[0].slice(0,-1)}e.splice(2,3,aq||e[3]);return e}},filter:{ID:k?function(e){e=e.replace(E,"");return function(ap){return ap.getAttribute("id")===e}}:function(e){e=e.replace(E,"");return function(aq){var ap=typeof aq.getAttributeNode!==I&&aq.getAttributeNode("id");return ap&&ap.value===e}},TAG:function(e){if(e==="*"){return function(){return true}}e=e.replace(E,"").toLowerCase();return function(ap){return ap.nodeName&&ap.nodeName.toLowerCase()===e}},CLASS:function(e){var ap=ad[e];if(!ap){ap=ad[e]=new RegExp("(^|"+L+")"+e+"("+L+"|$)");C.push(e);if(C.length>S.cacheLength){delete ad[C.shift()]}}return function(aq){return ap.test(aq.className||(typeof aq.getAttribute!==I&&aq.getAttribute("class"))||"")}},ATTR:function(aq,ap,e){if(!ap){return function(ar){return Z.attr(ar,aq)!=null}}return function(at){var ar=Z.attr(at,aq),au=ar+"";if(ar==null){return ap==="!="}switch(ap){case"=":return au===e;case"!=":return au!==e;case"^=":return e&&au.indexOf(e)===0;case"*=":return e&&au.indexOf(e)>-1;case"$=":return e&&au.substr(au.length-e.length)===e;case"~=":return(" "+au+" ").indexOf(e)>-1;case"|=":return au===e||au.substr(0,e.length+1)===e+"-"}}},CHILD:function(ap,ar,at,aq){if(ap==="nth"){var e=q++;return function(ax){var au,ay,aw=0,av=ax;if(at===1&&aq===0){return true}au=ax.parentNode;if(au&&(au[ai]!==e||!ax.sizset)){for(av=au.firstChild;av;av=av.nextSibling){if(av.nodeType===1){av.sizset=++aw;if(av===ax){break}}}au[ai]=e}ay=ax.sizset-aq;if(at===0){return ay===0}else{return(ay%at===0&&ay/at>=0)}}}return function(av){var au=av;switch(ap){case"only":case"first":while((au=au.previousSibling)){if(au.nodeType===1){return false}}if(ap==="first"){return true}au=av;case"last":while((au=au.nextSibling)){if(au.nodeType===1){return false}}return true}}},PSEUDO:function(at,ar,ap,e){var aq=S.pseudos[at]||S.pseudos[at.toLowerCase()];if(!aq){Z.error("unsupported pseudo: "+at)}if(!aq.sizzleFilter){return aq}return aq(ar,ap,e)}},pseudos:{not:ak(function(e,aq,ap){var ar=n(e.replace(ag,"$1"),aq,ap);return function(at){return !ar(at)}}),enabled:function(e){return e.disabled===false},disabled:function(e){return e.disabled===true},checked:function(e){var ap=e.nodeName.toLowerCase();return(ap==="input"&&!!e.checked)||(ap==="option"&&!!e.selected)},selected:function(e){if(e.parentNode){e.parentNode.selectedIndex}return e.selected===true},parent:function(e){return !S.pseudos.empty(e)},empty:function(ap){var e;ap=ap.firstChild;while(ap){if(ap.nodeName>"@"||(e=ap.nodeType)===3||e===4){return false}ap=ap.nextSibling}return true},contains:ak(function(e){return function(ap){return(ap.textContent||ap.innerText||a(ap)).indexOf(e)>-1}}),has:ak(function(e){return function(ap){return Z(e,ap).length>0}}),header:function(e){return B.test(e.nodeName)},text:function(aq){var ap,e;return aq.nodeName.toLowerCase()==="input"&&(ap=aq.type)==="text"&&((e=aq.getAttribute("type"))==null||e.toLowerCase()===ap)},radio:f("radio"),checkbox:f("checkbox"),file:f("file"),password:f("password"),image:f("image"),submit:D("submit"),reset:D("reset"),button:function(ap){var e=ap.nodeName.toLowerCase();return e==="input"&&ap.type==="button"||e==="button"},input:function(e){return Y.test(e.nodeName)},focus:function(e){var ap=e.ownerDocument;return e===ap.activeElement&&(!ap.hasFocus||ap.hasFocus())&&!!(e.type||e.href)},active:function(e){return e===e.ownerDocument.activeElement}},setFilters:{first:function(aq,ap,e){return e?aq.slice(1):[aq[0]]},last:function(ar,aq,ap){var e=ar.pop();return ap?ar:[e]},even:function(au,at,ar){var aq=[],ap=ar?1:0,e=au.length;for(;ap<e;ap=ap+2){aq.push(au[ap])}return aq},odd:function(au,at,ar){var aq=[],ap=ar?0:1,e=au.length;for(;ap<e;ap=ap+2){aq.push(au[ap])}return aq},lt:function(aq,ap,e){return e?aq.slice(+ap):aq.slice(0,+ap)},gt:function(aq,ap,e){return e?aq.slice(0,+ap+1):aq.slice(+ap+1)},eq:function(ar,aq,ap){var e=ar.splice(+aq,1);return ap?ar:e}}};S.setFilters.nth=S.setFilters.eq;S.filters=S.pseudos;if(!P){S.attrHandle={href:function(e){return e.getAttribute("href",2)},type:function(e){return e.getAttribute("type")}}}if(b){S.order.push("NAME");S.find.NAME=function(e,ap){if(typeof ap.getElementsByName!==I){return ap.getElementsByName(e)}}}if(O){S.order.splice(1,0,"CLASS");S.find.CLASS=function(aq,ap,e){if(typeof ap.getElementsByClassName!==I&&!e){return ap.getElementsByClassName(aq)}}}try{v.call(l.childNodes,0)[0].nodeType}catch(am){v=function(ap){var aq,e=[];for(;(aq=this[ap]);ap++){e.push(aq)}return e}}var w=Z.isXML=function(e){var ap=e&&(e.ownerDocument||e).documentElement;return ap?ap.nodeName!=="HTML":false};var M=Z.contains=l.compareDocumentPosition?function(ap,e){return !!(ap.compareDocumentPosition(e)&16)}:l.contains?function(ap,e){var ar=ap.nodeType===9?ap.documentElement:ap,aq=e.parentNode;return ap===aq||!!(aq&&aq.nodeType===1&&ar.contains&&ar.contains(aq))}:function(ap,e){while((e=e.parentNode)){if(e===ap){return true}}return false};var a=Z.getText=function(at){var ar,ap="",aq=0,e=at.nodeType;if(e){if(e===1||e===9||e===11){if(typeof at.textContent==="string"){return at.textContent}else{for(at=at.firstChild;at;at=at.nextSibling){ap+=a(at)}}}else{if(e===3||e===4){return at.nodeValue}}}else{for(;(ar=at[aq]);aq++){ap+=a(ar)}}return ap};Z.attr=function(ar,aq){var e,ap=w(ar);if(!ap){aq=aq.toLowerCase()}if(S.attrHandle[aq]){return S.attrHandle[aq](ar)}if(z||ap){return ar.getAttribute(aq)}e=ar.getAttributeNode(aq);return e?typeof ar[aq]==="boolean"?ar[aq]?aq:null:e.specified?e.value:null:null};Z.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)};[0,0].sort(function(){return(j=0)});if(l.compareDocumentPosition){r=function(ap,e){if(ap===e){m=true;return 0}return(!ap.compareDocumentPosition||!e.compareDocumentPosition?ap.compareDocumentPosition:ap.compareDocumentPosition(e)&4)?-1:1}}else{r=function(ay,ax){if(ay===ax){m=true;return 0}else{if(ay.sourceIndex&&ax.sourceIndex){return ay.sourceIndex-ax.sourceIndex}}var av,aq,ar=[],e=[],au=ay.parentNode,aw=ax.parentNode,az=au;if(au===aw){return d(ay,ax)}else{if(!au){return -1}else{if(!aw){return 1}}}while(az){ar.unshift(az);az=az.parentNode}az=aw;while(az){e.unshift(az);az=az.parentNode}av=ar.length;aq=e.length;for(var at=0;at<av&&at<aq;at++){if(ar[at]!==e[at]){return d(ar[at],e[at])}}return at===av?d(ay,e[at],-1):d(ar[at],ax,1)};d=function(ap,e,aq){if(ap===e){return aq}var ar=ap.nextSibling;while(ar){if(ar===e){return -1}ar=ar.nextSibling}return 1}}Z.uniqueSort=function(ap){var aq,e=1;if(r){m=j;ap.sort(r);if(m){for(;(aq=ap[e]);e++){if(aq===ap[e-1]){ap.splice(e--,1)}}}}return ap};function y(ap,au,at,aq){var ar=0,e=au.length;for(;ar<e;ar++){Z(ap,au[ar],at,aq)}}function U(e,aq,av,aw,ap,au){var ar,at=S.setFilters[aq.toLowerCase()];if(!at){Z.error(aq)}if(e||!(ar=ap)){y(e||"*",aw,(ar=[]),ap)}return ar.length>0?at(ar,av,au):[]}function ac(az,e,ax,aq,aD){var au,ap,at,aF,aw,aE,ay,aC,aA=0,aB=aD.length,ar=Q.POS,av=new RegExp("^"+ar.source+"(?!"+L+")","i"),aG=function(){var aI=1,aH=arguments.length-2;for(;aI<aH;aI++){if(arguments[aI]===s){au[aI]=s}}};for(;aA<aB;aA++){ar.exec("");az=aD[aA];aF=[];at=0;aw=aq;while((au=ar.exec(az))){aC=ar.lastIndex=au.index+au[0].length;if(aC>at){ay=az.slice(at,au.index);at=aC;aE=[e];if(R.test(ay)){if(aw){aE=aw}aw=aq}if((ap=aj.test(ay))){ay=ay.slice(0,-5).replace(R,"$&*")}if(au.length>1){au[0].replace(av,aG)}aw=U(ay,au[1],au[2],aE,aw,ap)}}if(aw){aF=aF.concat(aw);if((ay=az.slice(at))&&ay!==")"){y(ay,aF,ax,aq)}else{ae.apply(ax,aF)}}else{Z(az,e,ax,aq)}}return aB===1?ax:Z.uniqueSort(ax)}function c(av,aq,ay){var aA,az,aB,at=[],aw=0,ax=V.exec(av),ap=!ax.pop()&&!ax.pop(),aC=ap&&av.match(F)||[""],e=S.preFilter,ar=S.filter,au=!ay&&aq!==i;for(;(az=aC[aw])!=null&&ap;aw++){at.push(aA=[]);if(au){az=" "+az}while(az){ap=false;if((ax=R.exec(az))){az=az.slice(ax[0].length);ap=aA.push({part:ax.pop().replace(ag," "),captures:ax})}for(aB in ar){if((ax=Q[aB].exec(az))&&(!e[aB]||(ax=e[aB](ax,aq,ay)))){az=az.slice(ax.shift().length);ap=aA.push({part:aB,captures:ax})}}if(!ap){break}}}if(!ap){Z.error(av)}return at}function J(at,ar,aq){var e=ar.dir,ap=q++;if(!at){at=function(au){return au===aq}}return ar.first?function(av,au){while((av=av[e])){if(av.nodeType===1){return at(av,au)&&av}}}:function(aw,av){var au,ax=ap+"."+A,ay=ax+"."+af;while((aw=aw[e])){if(aw.nodeType===1){if((au=aw[ai])===ay){return aw.sizset}else{if(typeof au==="string"&&au.indexOf(ax)===0){if(aw.sizset){return aw}}else{aw[ai]=ay;if(at(aw,av)){aw.sizset=true;return aw}aw.sizset=false}}}}}}function H(e,ap){return e?function(at,ar){var aq=ap(at,ar);return aq&&e(aq===true?at:aq,ar)}:ap}function K(au,ar,e){var aq,at,ap=0;for(;(aq=au[ap]);ap++){if(S.relative[aq.part]){at=J(at,S.relative[aq.part],ar)}else{aq.captures.push(ar,e);at=H(at,S.filter[aq.part].apply(null,aq.captures))}}return at}function g(e){return function(ar,aq){var at,ap=0;for(;(at=e[ap]);ap++){if(at(ar,aq)){return true}}return false}}var n=Z.compile=function(e,ar,ap){var av,au,aq,at=x[e];if(at&&at.context===ar){return at}au=c(e,ar,ap);for(aq=0;(av=au[aq]);aq++){au[aq]=K(av,ar,ap)}at=x[e]=g(au);at.context=ar;at.runs=at.dirruns=0;G.push(e);if(G.length>S.cacheLength){delete x[G.shift()]}return at};Z.matches=function(ap,e){return Z(ap,null,null,e)};Z.matchesSelector=function(e,ap){return Z(ap,null,null,[e]).length>0};var ah=function(at,ap,av,az,ay){at=at.replace(ag,"$1");var e,aA,aw,aB,aq,ar,aD,aE,au,ax=at.match(F),aC=at.match(al),aF=ap.nodeType;if(Q.POS.test(at)){return ac(at,ap,av,az,ax)}if(az){e=v.call(az,0)}else{if(ax&&ax.length===1){if(aC.length>1&&aF===9&&!ay&&(ax=Q.ID.exec(aC[0]))){ap=S.find.ID(ax[1],ap,ay)[0];if(!ap){return av}at=at.slice(aC.shift().length)}aE=((ax=ab.exec(aC[0]))&&!ax.index&&ap.parentNode)||ap;au=aC.pop();ar=au.split(":not")[0];for(aw=0,aB=S.order.length;aw<aB;aw++){aD=S.order[aw];if((ax=Q[aD].exec(ar))){e=S.find[aD]((ax[1]||"").replace(E,""),aE,ay);if(e==null){continue}if(ar===au){at=at.slice(0,at.length-au.length)+ar.replace(Q[aD],"");if(!at){ae.apply(av,v.call(e,0))}}break}}}}if(at){aA=n(at,ap,ay);A=aA.dirruns++;if(e==null){e=S.find.TAG("*",(ab.test(at)&&ap.parentNode)||ap)}for(aw=0;(aq=e[aw]);aw++){af=aA.runs++;if(aA(aq,ap)){av.push(aq)}}}return av};if(i.querySelectorAll){(function(){var au,av=ah,at=/'|\\/g,aq=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,ap=[],e=[":active"],ar=l.matchesSelector||l.mozMatchesSelector||l.webkitMatchesSelector||l.oMatchesSelector||l.msMatchesSelector;T(function(aw){aw.innerHTML="<select><option selected></option></select>";if(!aw.querySelectorAll("[selected]").length){ap.push("\\["+L+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)")}if(!aw.querySelectorAll(":checked").length){ap.push(":checked")}});T(function(aw){aw.innerHTML="<p test=''></p>";if(aw.querySelectorAll("[test^='']").length){ap.push("[*^$]="+L+"*(?:\"\"|'')")}aw.innerHTML="<input type='hidden'>";if(!aw.querySelectorAll(":enabled").length){ap.push(":enabled",":disabled")}});ap=ap.length&&new RegExp(ap.join("|"));ah=function(aB,ax,aC,aE,aD){if(!aE&&!aD&&(!ap||!ap.test(aB))){if(ax.nodeType===9){try{ae.apply(aC,v.call(ax.querySelectorAll(aB),0));return aC}catch(aA){}}else{if(ax.nodeType===1&&ax.nodeName.toLowerCase()!=="object"){var az=ax.getAttribute("id"),aw=az||ai,ay=ab.test(aB)&&ax.parentNode||ax;if(az){aw=aw.replace(at,"\\$&")}else{ax.setAttribute("id",aw)}try{ae.apply(aC,v.call(ay.querySelectorAll(aB.replace(F,"[id='"+aw+"'] $&")),0));return aC}catch(aA){}finally{if(!az){ax.removeAttribute("id")}}}}}return av(aB,ax,aC,aE,aD)};if(ar){T(function(ax){au=ar.call(ax,"div");try{ar.call(ax,"[test!='']:sizzle");e.push(S.match.PSEUDO)}catch(aw){}});e=new RegExp(e.join("|"));Z.matchesSelector=function(ax,az){az=az.replace(aq,"='$1']");if(!w(ax)&&!e.test(az)&&(!ap||!ap.test(az))){try{var aw=ar.call(ax,az);if(aw||au||ax.document&&ax.document.nodeType!==11){return aw}}catch(ay){}}return Z(az,null,null,[ax]).length>0}}})()}return Z})(window);
})();
window.Modernizr=(function(A,c,g){var J="2.6.2",w={},y=true,M=c.documentElement,a="modernizr",I=c.createElement(a),E=I.style,L=c.createElement("input"),C=":)",b={}.toString,j=" -webkit- -moz- -o- -ms- ".split(" "),h="Webkit Moz O ms",F=h.split(" "),K=h.toLowerCase().split(" "),H={svg:"http://www.w3.org/2000/svg"},l={},p={},f={},e=[],k=e.slice,s,n=function(V,X,P,W){var O,U,R,S,N=c.createElement("div"),T=c.body,Q=T||c.createElement("body");if(parseInt(P,10)){while(P--){R=c.createElement("div");R.id=W?W[P]:a+(P+1);N.appendChild(R)}}O=["&#173;",'<style id="s',a,'">',V,"</style>"].join("");N.id=a;(T?N:Q).innerHTML+=O;Q.appendChild(N);if(!T){Q.style.background="";Q.style.overflow="hidden";S=M.style.overflow;M.style.overflow="hidden";M.appendChild(Q)}U=X(N,V);if(!T){Q.parentNode.removeChild(Q);M.style.overflow=S}else{N.parentNode.removeChild(N)}return !!U},G=function(P){var O=A.matchMedia||A.msMatchMedia;if(O){return O(P).matches}var N;n("@media "+P+" { #"+a+" { position: absolute; } }",function(Q){N=(A.getComputedStyle?getComputedStyle(Q,null):Q.currentStyle)["position"]=="absolute"});return N},o=(function(){var O={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};function N(P,R){R=R||c.createElement(O[P]||"div");P="on"+P;var Q=P in R;if(!Q){if(!R.setAttribute){R=c.createElement("div")}if(R.setAttribute&&R.removeAttribute){R.setAttribute(P,"");Q=r(R[P],"function");if(!r(R[P],"undefined")){R[P]=g}R.removeAttribute(P)}}R=null;return Q}return N})(),i=({}).hasOwnProperty,x;if(!r(i,"undefined")&&!r(i.call,"undefined")){x=function(N,O){return i.call(N,O)}}else{x=function(N,O){return((O in N)&&r(N.constructor.prototype[O],"undefined"))}}if(!Function.prototype.bind){Function.prototype.bind=function d(P){var Q=this;if(typeof Q!="function"){throw new TypeError()}var N=k.call(arguments,1),O=function(){if(this instanceof O){var T=function(){};T.prototype=Q.prototype;var S=new T();var R=Q.apply(S,N.concat(k.call(arguments)));if(Object(R)===R){return R}return S}else{return Q.apply(P,N.concat(k.call(arguments)))}};return O}}function D(N){E.cssText=N}function u(O,N){return D(j.join(O+";")+(N||""))}function r(O,N){return typeof O===N}function t(O,N){return !!~(""+O).indexOf(N)}function z(P,N){for(var O in P){var Q=P[O];if(!t(Q,"-")&&E[Q]!==g){return N=="pfx"?Q:true}}return false}function q(O,R,Q){for(var N in O){var P=R[O[N]];if(P!==g){if(Q===false){return O[N]}if(r(P,"function")){return P.bind(Q||R)}return P}}return false}function m(R,N,Q){var O=R.charAt(0).toUpperCase()+R.slice(1),P=(R+" "+F.join(O+" ")+O).split(" ");if(r(N,"string")||r(N,"undefined")){return z(P,N)}else{P=(R+" "+(K).join(O+" ")+O).split(" ");return q(P,N,Q)}}l.flexbox=function(){return m("flexWrap")};l.flexboxlegacy=function(){return m("boxDirection")};l.canvas=function(){var N=c.createElement("canvas");return !!(N.getContext&&N.getContext("2d"))};l.canvastext=function(){return !!(w.canvas&&r(c.createElement("canvas").getContext("2d").fillText,"function"))};l.webgl=function(){return !!A.WebGLRenderingContext};l.touch=function(){var N;if(("ontouchstart" in A)||A.DocumentTouch&&c instanceof DocumentTouch){N=true}else{n(["@media (",j.join("touch-enabled),("),a,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(O){N=O.offsetTop===9})}return N};l.geolocation=function(){return"geolocation" in navigator};l.postmessage=function(){return !!A.postMessage};l.websqldatabase=function(){return !!A.openDatabase};l.indexedDB=function(){return !!m("indexedDB",A)};l.hashchange=function(){return o("hashchange",A)&&(c.documentMode===g||c.documentMode>7)};l.history=function(){return !!(A.history&&history.pushState)};l.draganddrop=function(){var N=c.createElement("div");return("draggable" in N)||("ondragstart" in N&&"ondrop" in N)};l.websockets=function(){return"WebSocket" in A||"MozWebSocket" in A};l.rgba=function(){D("background-color:rgba(150,255,150,.5)");return t(E.backgroundColor,"rgba")};l.hsla=function(){D("background-color:hsla(120,40%,100%,.5)");return t(E.backgroundColor,"rgba")||t(E.backgroundColor,"hsla")};l.multiplebgs=function(){D("background:url(https://),url(https://),red url(https://)");return(/(url\s*\(.*?){3}/).test(E.background)};l.backgroundsize=function(){return m("backgroundSize")};l.borderimage=function(){return m("borderImage")};l.borderradius=function(){return m("borderRadius")};l.boxshadow=function(){return m("boxShadow")};l.textshadow=function(){return c.createElement("div").style.textShadow===""};l.opacity=function(){u("opacity:.55");return(/^0.55$/).test(E.opacity)};l.cssanimations=function(){return m("animationName")};l.csscolumns=function(){return m("columnCount")};l.cssgradients=function(){var P="background-image:",O="gradient(linear,left top,right bottom,from(#9f9),to(white));",N="linear-gradient(left top,#9f9, white);";D((P+"-webkit- ".split(" ").join(O+P)+j.join(N+P)).slice(0,-P.length));return t(E.backgroundImage,"gradient")};l.cssreflections=function(){return m("boxReflect")};l.csstransforms=function(){return !!m("transform")};l.csstransforms3d=function(){var N=!!m("perspective");if(N&&"webkitPerspective" in M.style){n("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(O,P){N=O.offsetLeft===9&&O.offsetHeight===3})}return N};l.csstransitions=function(){return m("transition")};l.fontface=function(){var N;n('@font-face {font-family:"font";src:url("https://")}',function(R,S){var Q=c.getElementById("smodernizr"),O=Q.sheet||Q.styleSheet,P=O?(O.cssRules&&O.cssRules[0]?O.cssRules[0].cssText:O.cssText||""):"";N=/src/i.test(P)&&P.indexOf(S.split(" ")[0])===0});return N};l.generatedcontent=function(){var N;n(["#",a,"{font:0/0 a}#",a,':after{content:"',C,'";visibility:hidden;font:3px/1 a}'].join(""),function(O){N=O.offsetHeight>=3});return N};l.video=function(){var O=c.createElement("video"),N=false;try{if(N=!!O.canPlayType){N=new Boolean(N);N.ogg=O.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,"");N.h264=O.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,"");N.webm=O.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,"")}}catch(P){}return N};l.audio=function(){var O=c.createElement("audio"),N=false;try{if(N=!!O.canPlayType){N=new Boolean(N);N.ogg=O.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,"");N.mp3=O.canPlayType("audio/mpeg;").replace(/^no$/,"");N.wav=O.canPlayType('audio/wav; codecs="1"').replace(/^no$/,"");N.m4a=(O.canPlayType("audio/x-m4a;")||O.canPlayType("audio/aac;")).replace(/^no$/,"")}}catch(P){}return N};l.localstorage=function(){try{localStorage.setItem(a,a);localStorage.removeItem(a);return true}catch(N){return false}};l.sessionstorage=function(){try{sessionStorage.setItem(a,a);sessionStorage.removeItem(a);return true}catch(N){return false}};l.webworkers=function(){return !!A.Worker};l.applicationcache=function(){return !!A.applicationCache};l.svg=function(){return !!c.createElementNS&&!!c.createElementNS(H.svg,"svg").createSVGRect};l.inlinesvg=function(){var N=c.createElement("div");N.innerHTML="<svg/>";return(N.firstChild&&N.firstChild.namespaceURI)==H.svg};l.smil=function(){return !!c.createElementNS&&/SVGAnimate/.test(b.call(c.createElementNS(H.svg,"animate")))};l.svgclippaths=function(){return !!c.createElementNS&&/SVGClipPath/.test(b.call(c.createElementNS(H.svg,"clipPath")))};function B(){w.input=(function(P){for(var O=0,N=P.length;O<N;O++){f[P[O]]=!!(P[O] in L)}if(f.list){f.list=!!(c.createElement("datalist")&&A.HTMLDataListElement)}return f})("autocomplete autofocus list placeholder max min multiple pattern required step".split(" "));w.inputtypes=(function(Q){for(var P=0,O,S,R,N=Q.length;P<N;P++){L.setAttribute("type",S=Q[P]);O=L.type!=="text";if(O){L.value=C;L.style.cssText="position:absolute;visibility:hidden;";if(/^range$/.test(S)&&L.style.WebkitAppearance!==g){M.appendChild(L);R=c.defaultView;O=R.getComputedStyle&&R.getComputedStyle(L,null).WebkitAppearance!=="textfield"&&(L.offsetHeight!==0);M.removeChild(L)}else{if(/^(search|tel)$/.test(S)){}else{if(/^(url|email)$/.test(S)){O=L.checkValidity&&L.checkValidity()===false}else{O=L.value!=C}}}}p[Q[P]]=!!O}return p})("search tel url email datetime date month week time datetime-local number range color".split(" "))}for(var v in l){if(x(l,v)){s=v.toLowerCase();w[s]=l[v]();e.push((w[s]?"":"no-")+s)}}w.input||B();w.addTest=function(O,P){if(typeof O=="object"){for(var N in O){if(x(O,N)){w.addTest(N,O[N])}}}else{O=O.toLowerCase();if(w[O]!==g){return w}P=typeof P=="function"?P():P;if(typeof y!=="undefined"&&y){M.className+=" "+(P?"":"no-")+O}w[O]=P}return w};D("");I=L=null;w._version=J;w._prefixes=j;w._domPrefixes=K;w._cssomPrefixes=F;w.mq=G;w.hasEvent=o;w.testProp=function(N){return z([N])};w.testAllProps=m;w.testStyles=n;w.prefixed=function(P,O,N){if(!O){return m(P,"pfx")}else{return m(P,O,N)}};M.className=M.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(y?" js "+e.join(" "):"");return w})(this,this.document);
/*! HTML5 Shiv v3.6 | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed */
(function(o,s){var g=o.html5||{};var j=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i;var d=/^<|^(?:a|b|button|code|div|fieldset|form|h1|h2|h3|h4|h5|h6|i|iframe|img|input|label|li|link|ol|option|p|param|q|script|select|span|strong|style|table|tbody|td|textarea|tfoot|th|thead|tr|ul)$/i;var x;var k="_html5shiv";var c=0;var u={};var h;(function(){try{var A=s.createElement("a");A.innerHTML="<xyz></xyz>";x=("hidden" in A);h=A.childNodes.length==1||(function(){(s.createElement)("a");var C=s.createDocumentFragment();return(typeof C.cloneNode=="undefined"||typeof C.createDocumentFragment=="undefined"||typeof C.createElement=="undefined")}())}catch(B){x=true;h=true}}());function i(A,C){var D=A.createElement("p"),B=A.getElementsByTagName("head")[0]||A.documentElement;D.innerHTML="x<style>"+C+"</style>";return B.insertBefore(D.lastChild,B.firstChild)}function q(){var A=n.elements;return typeof A=="string"?A.split(" "):A}function w(A){var B=u[A[k]];if(!B){B={};c++;A[k]=c;u[c]=B}return B}function t(D,A,C){if(!A){A=s}if(h){return A.createElement(D)}if(!C){C=w(A)}var B;if(C.cache[D]){B=C.cache[D].cloneNode()}else{if(d.test(D)){B=(C.cache[D]=C.createElem(D)).cloneNode()}else{B=C.createElem(D)}}return B.canHaveChildren&&!j.test(D)?C.frag.appendChild(B):B}function y(C,E){if(!C){C=s}if(h){return C.createDocumentFragment()}E=E||w(C);var F=E.frag.cloneNode(),D=0,B=q(),A=B.length;for(;D<A;D++){F.createElement(B[D])}return F}function z(A,B){if(!B.cache){B.cache={};B.createElem=A.createElement;B.createFrag=A.createDocumentFragment;B.frag=B.createFrag()}A.createElement=function(C){if(!n.shivMethods){return B.createElem(C)}return t(C,A,B)};A.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+q().join().replace(/\w+/g,function(C){B.createElem(C);B.frag.createElement(C);return'c("'+C+'")'})+");return n}")(n,B.frag)}function e(A){if(!A){A=s}var B=w(A);if(n.shivCSS&&!x&&!B.hasCSS){B.hasCSS=!!i(A,"article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")}if(!h){z(A,B)}return A}var n={elements:g.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:(g.shivCSS!==false),supportsUnknownElements:h,shivMethods:(g.shivMethods!==false),type:"default",shivDocument:e,createElement:t,createDocumentFragment:y};o.html5=n;e(s);var b=/^$|\b(?:all|print)\b/;var l="html5shiv";var r=!h&&(function(){var A=s.documentElement;return !(typeof s.namespaces=="undefined"||typeof s.parentWindow=="undefined"||typeof A.applyElement=="undefined"||typeof A.removeNode=="undefined"||typeof o.attachEvent=="undefined")}());function f(E){var F,C=E.getElementsByTagName("*"),D=C.length,B=RegExp("^(?:"+q().join("|")+")$","i"),A=[];while(D--){F=C[D];if(B.test(F.nodeName)){A.push(F.applyElement(v(F)))}}return A}function v(C){var D,A=C.attributes,B=A.length,E=C.ownerDocument.createElement(l+":"+C.nodeName);while(B--){D=A[B];D.specified&&E.setAttribute(D.nodeName,D.nodeValue)}E.style.cssText=C.style.cssText;return E}function a(D){var F,E=D.split("{"),B=E.length,A=RegExp("(^|[\\s,>+~])("+q().join("|")+")(?=[[\\s,>+~#.:]|$)","gi"),C="$1"+l+"\\:$2";while(B--){F=E[B]=E[B].split("}");F[F.length-1]=F[F.length-1].replace(A,C);E[B]=F.join("}")}return E.join("{")}function p(B){var A=B.length;while(A--){B[A].removeNode()}}function m(A){var G,E,D=w(A),C=A.namespaces,F=A.parentWindow;if(!r||A.printShived){return A}if(typeof C[l]=="undefined"){C.add(l)}function B(){clearTimeout(D._removeSheetTimer);if(G){G.removeNode(true)}G=null}F.attachEvent("onbeforeprint",function(){B();var H,L,J,N=A.styleSheets,K=[],I=N.length,M=Array(I);while(I--){M[I]=N[I]}while((J=M.pop())){if(!J.disabled&&b.test(J.media)){try{H=J.imports;L=H.length}catch(O){L=0}for(I=0;I<L;I++){M.push(H[I])}try{K.push(J.cssText)}catch(O){}}}K=a(K.reverse().join(""));E=f(A);G=i(A,K)});F.attachEvent("onafterprint",function(){p(E);clearTimeout(D._removeSheetTimer);D._removeSheetTimer=setTimeout(B,500)});A.printShived=true;return A}n.type+=" print";n.shivPrint=m;m(s)}(this,document));(function(ad,ac,ab){function aa(b){return"[object Function]"==P.call(b)}function Z(b){return"string"==typeof b}function Y(){}function X(b){return !b||"loaded"==b||"complete"==b||"uninitialized"==b}function W(){var b=O.shift();M=1,b?b.t?R(function(){("c"==b.t?L.injectCss:L.injectJs)(b.s,0,b.a,b.x,b.e,1)},0):(b(),W()):M=0}function V(w,v,t,s,q,p,n){function m(a){if(!g&&X(h.readyState)&&(x.r=g=1,!M&&W(),h.onload=h.onreadystatechange=null,a)){"img"!=w&&R(function(){I.removeChild(h)},50);for(var c in D[v]){D[v].hasOwnProperty(c)&&D[v][c].onload()}}}var n=n||L.errorTimeout,h=ac.createElement(w),g=0,b=0,x={t:t,s:v,e:q,a:p,x:n};1===D[v]&&(b=1,D[v]=[]),"object"==w?h.data=v:(h.src=v,h.type=w),h.width=h.height="0",h.onerror=h.onload=h.onreadystatechange=function(){m.call(this,b)},O.splice(s,0,x),"img"!=w&&(b||2===D[v]?(I.insertBefore(h,J?null:Q),R(m,n)):D[v].push(h))}function U(g,e,j,i,h){return M=0,e=e||"j",Z(g)?V("c"==e?G:H,g,e,this.i++,j,i,h):(O.splice(this.i++,0,g),1==O.length&&W()),this}function T(){var b=L;return b.loader={load:U,i:0},b}var S=ac.documentElement,R=ad.setTimeout,Q=ac.getElementsByTagName("script")[0],P={}.toString,O=[],M=0,K="MozAppearance" in S.style,J=K&&!!ac.createRange().compareNode,I=J?S:Q.parentNode,S=ad.opera&&"[object Opera]"==P.call(ad.opera),S=!!ac.attachEvent&&!S,H=K?"object":S?"script":"img",G=S?"script":H,F=Array.isArray||function(b){return"[object Array]"==P.call(b)},E=[],D={},C={timeout:function(d,c){return c.length&&(d.timeout=c[0]),d}},N,L;L=function(e){function c(i){var i=i.split("!"),h=E.length,q=i.pop(),p=i.length,q={url:q,origUrl:q,prefixes:i},o,l,j;for(l=0;l<p;l++){j=i[l].split("="),(o=C[j.shift()])&&(q=o(q,j))}for(l=0;l<h;l++){q=E[l](q)}return q}function n(b,s,r,q,p){var o=c(b),l=o.autoCallback;o.url.split(".").pop().split("?").shift(),o.bypass||(s&&(s=aa(s)?s:s[b]||s[q]||s[b.split("/").pop().split("?")[0]]),o.instead?o.instead(b,s,r,q,p):(D[o.url]?o.noexec=!0:D[o.url]=1,r.load(o.url,o.forceCSS||!o.forceJS&&"css"==o.url.split(".").pop().split("?").shift()?"c":ab,o.noexec,o.attrs,o.timeout),(aa(s)||aa(l))&&r.load(function(){T(),s&&s(o.origUrl,p,q),l&&l(o.origUrl,p,q),D[o.url]=2})))}function m(w,v){function u(b,h){if(b){if(Z(b)){h||(r=function(){var i=[].slice.call(arguments);q.apply(this,i),p()}),n(b,r,v,0,t)}else{if(Object(b)===b){for(g in o=function(){var a=0,i;for(i in b){b.hasOwnProperty(i)&&a++}return a}(),b){b.hasOwnProperty(g)&&(!h&&!--o&&(aa(r)?r=function(){var i=[].slice.call(arguments);q.apply(this,i),p()}:r[g]=function(i){return function(){var a=[].slice.call(arguments);i&&i.apply(this,a),p()}}(q[g])),n(b[g],r,v,g,t))}}}}else{!h&&p()}}var t=!!w.test,s=w.load||w.both,r=w.callback||Y,q=r,p=w.complete||Y,o,g;u(t?w.yep:w.nope,!!s),s&&u(s)}var k,f,d=this.yepnope.loader;if(Z(e)){n(e,0,d,0)}else{if(F(e)){for(k=0;k<e.length;k++){f=e[k],Z(f)?n(f,0,d,0):F(f)?L(f):Object(f)===f&&m(f,d)}}else{Object(e)===e&&m(e,d)}}},L.addPrefix=function(d,c){C[d]=c},L.addFilter=function(b){E.push(b)},L.errorTimeout=10000,null==ac.readyState&&ac.addEventListener&&(ac.readyState="loading",ac.addEventListener("DOMContentLoaded",N=function(){ac.removeEventListener("DOMContentLoaded",N,0),ac.readyState="complete"},0)),ad.yepnope=T(),ad.yepnope.executeStack=W,ad.yepnope.injectJs=function(r,q,p,n,m,h){var g=ac.createElement("script"),f,b,n=n||L.errorTimeout;g.src=r;for(b in p){g.setAttribute(b,p[b])}q=h?W:q||Y,g.onreadystatechange=g.onload=function(){!f&&X(g.readyState)&&(f=1,q(),g.onload=g.onreadystatechange=null)},R(function(){f||(f=1,q(1))},n),m?g.onload():Q.parentNode.insertBefore(g,Q)},ad.yepnope.injectCss=function(b,n,m,l,k,h){var l=ac.createElement("link"),f,n=h?W:n||Y;l.href=b,l.rel="stylesheet",l.type="text/css";for(f in m){l.setAttribute(f,m[f])}k||(Q.parentNode.insertBefore(l,Q),R(n,0))}})(this,document);Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};

(function(){
    var extensions = [];
    extendObject("options",function(){
        var mys = this;
        var atr = {
            contextMenu:true,
            both:false,
            posX:undefined,
            posY:undefined,
            onClose:null,
            onOpen:null
        };
        var container = document.createElement("div");
        container.className = "mnu";
        container.style.position = "fixed";
        container.style.zIndex = "2147483640";
        var _tant = null;
        function applyDrop(itm,elm){
            itm.drop(elm["class"],elm.ondrop,elm.ondragenter,elm.ondragleave,elm.ondragover);
        }
        function renderItem(itm,_ant){
            var optn = document.createElement("div");
            optn.style.position="relative";
            optn.className="opt";
            container.appendChild(optn);
            var nm = document.createElement("div");
            nm.className = "nm";
            nm.appendChild(document.createTextNode(itm.name));
            optn.appendChild(nm);
            var img = document.createElement("div");
            img.className = "img";
            if(itm.image){
                if(is_function(itm.image)){
                    var t = null;
                    try{
                        t = itm.image.apply(itm,[img]);
                    }catch(e){}
                    if(is_element(t))img.appendChild(t);
                }else if(is_element(itm.image))img.appendChild(itm.image);
            }
            optn.appendChild(img);
            var tmp = null;
            if(!(is_array(itm.children)&&itm.children.length>0)){
                if(is_object(itm.extension)){
                    tmp = applyExtension(itm.extension,optn);
                    if(is_element(tmp)){
                        optn.parentNode.insertBefore(tmp,optn);
                        optn.remove();
                        optn = tmp;
                    }else tmp = null;
                }
            }
            if(is_object(itm.drop))applyDrop(optn,itm.drop);
            optn.addEvent("mouseover",function(e){
                var slf = this;
                each(optn.parentNode.find(this.find(">div.chld").length>0?">div.opt":"div.opt"),function(){
                    if(slf==this)return;
                    if(_ant){
                        clearTimeout(_ant);
                        _ant = null;
                    }
                    var t = this.find(">div.chld");
                    if(t.length>0){
                        this.find(">div.chld")[0].style.display="none";
                    }
                });
            });
            optn.addEvent("mouseout",function(e){
                if(_ant){
                    clearTimeout(_ant);
                    _ant = null;
                }
            });
            if(is_array(itm.children)){
                var _ant = null;
                var chld = document.createElement("div");
                chld.style.position="absolute";
                chld.className ="mr";
                optn.appendChild(chld);
                chld = document.createElement("div");
                chld.className = "chld";
                each(itm.children,function(){
                    if(this == "line"){
                        var line = document.createElement("div");
                        line.className = "ln";
                        chld.appendChild(line);
                    } else if(is_object(this))chld.appendChild(renderItem(this,_ant));
                });
                chld.style.display="none";
                if(chld.children.length>0){
                    function showChild(){
                        chld.style.display="block";
                        chld.style.margin="-4px 0px 0px -3px";
                        chld.style.right = "auto";
                        chld.style.left = "100%";
                        chld.style.top = "0px";
                        chld.style.bottom = "auto";
                        var functc = chld.find(">div[has-function='true']");
                        if(functc.length>0){
                            each(functc,function(){
                                if(this.__fwOptOnShow){
                                    try{
                                        this.__fwOptOnShow.apply(null,[]);
                                    }catch(e){}
                                }
                            });
                        }
                        var h = window.getHeight();
                        var w = window.getWidth();
                        var h1 = chld.getHeight();
                        var w1 = chld.getWidth();
                        var x = chld.findAbsPosX()-window.getScrollLeft();
                        var y = chld.findAbsPosY()-window.getScrollTop();
                        if(w1+x>w){
                            chld.style.marginLeft="0px";
                            chld.style.marginRight="-3px";
                            chld.style.right = "100%";
                            chld.style.left = "auto";
                        }
                        if(h1+y>h){
                            chld.style.marginTop="0px";
                            chld.style.marginBottom="-4px";
                            chld.style.top = "auto";
                            chld.style.bottom = "0px";
                        }
                    }
                    optn.addEvent("mouseover",function(e){
                        if(_ant){
                            clearTimeout(_ant);
                            _ant = null;
                        }
                        _tant = _ant = setTimeout(function(){
                            showChild();
                        },300);
                    });
                    optn.addEvent("click",function(e){
                        if(_ant){
                            clearTimeout(_ant);
                            _ant = null;
                        }
                        showChild();
                    });
                }
                optn.appendChild(chld);
            }
            optn.addEvent("click",function(e){
                if(is_array(itm.children))return;
                if(is_function(optn.__fwOptOnClose)){
                    var rs = optn.__fwOptOnClose.apply(optn,[e,mys]);
                    if(rs===false)return;
                }
                hide();
                setTimeout(function(){
                    try{
                        if(is_function(itm.action))itm.action.apply(optn,[e,mys]);
                    }catch(e){}
                },10);
            });
            return optn;
        }
        function applyExtension(data,elm){
            if(is_string(data.name)){
                var i = extensions.find(function(){return this.name==data.name;});
                if(i>-1){
                    try{
                        var result = extensions[i].fun.apply(elm,[data,elm,mys]);
                        if(is_function(extensions[i].onShow)){
                            var dt = result||elm;
                            dt.setAttribute("has-function","true");
                            var _slf = extensions[i];
                            dt.__fwOptOnShow = function(){
                                _slf.onShow.apply(dt,[data,elm,mys]);
                            };
                        }
                        if(is_function(extensions[i].onClick))dt.__fwOptOnClose = _slf.onClick;
                        return result;
                    }catch(e){}
                }
            }
        }
        each(arguments,function(){
            if(this == "line"){
                var line = document.createElement("div");
                line.className = "ln";
                container.appendChild(line);
            } else if(is_object(this))container.appendChild(renderItem(this));
        });
        this.context = function(attr){
            for (var key in attr)atr[key] = attr[key];
        }
        var showing = false;
        function add(x,y){
            var h = window.getHeight();
            var w = window.getWidth();
            container.style.display = "block";
            var tmp = container.find(">div[has-function='true']");
            if(tmp.length>0){
                each(tmp,function(){
                    if(this.__fwOptOnShow){
                        try{
                            this.__fwOptOnShow.apply(null,[]);
                        }catch(e){}
                    }
                });
            }
            document.body.appendChild(container);
            var h1 = container.getHeight();
            var w1 = container.getWidth();
            container.style.display = "none";
            var requestedX = null;
            var requestedY = null;
            if(atr.posX!=undefined){
                if(is_function(atr.posX)){
                    var t = null;
                    try{
                        t = atr.posX.apply(null,[w1]);
                        if(is_number(t)){
                            requestedX = t;
                            x = t;
                        }
                    }catch (e){}
                }else if(is_number(atr.posX))x = atr.posX;
            }
            if(atr.posY!=undefined){
                if(is_function(atr.posY)){
                    var t = null;
                    try{
                        t = atr.posY.apply(null,[h1]);
                        if(is_number(t)){
                            requestedY = t;
                            y = t;
                        }
                    }catch (e){}
                }else if(is_number(atr.posY))y = atr.posY;
            }
            container.style.display = "block";
            if(y+h1>h){
                y -= h1;
                if(y<0)y = 0;
            }
            if(x+w1>w){
                x -= w1;
                if(x<0)x = 0;
            }
            container.style.top = y + "px";
            container.style.left = x + "px";
            showing = true;
            try{
                if(is_function(atr.onOpen))atr.onOpen.apply(null,[container,x,y,requestedX,requestedY]);
            }catch(e){}
            (function(){
                if (browser.IE&&browser.version<9)return document.body;
                else return window;
            })().addEvent("mousedown",mousedown);
            (function(){
                if (browser.IE&&browser.version<9)return document.body;
                else return window;
            })().addEvent("scroll",scroll);
            (function(){
                if (browser.IE&&browser.version<9)return document.body;
                else return window;
            })().addEvent("keydown",keydown);
            (function(fn) {
                if(browser.IE&&browser.version==9)window.addEvent("focusout",fn);
                else if(browser.IE&&browser.version<9)document.addEvent("focusout",fn);
                else window.addEvent("blur",fn);
            })(blur);
            window.addEvent("BKScroll",BKScroll);
            window.addEvent("resize",hide);
            if(window.onScroll)window.onScroll.add(scroll);
            window.addEvent("ajaxunload",hide);
        }
        function BKScroll(e){
            var targ = e.target;
            targ = targ.parentNode;
            while(targ&&targ!=document.body&&targ!=container)targ = targ.parentNode;
            if(targ==container)return;
            hide();
        }
        function hide(){
            if(!showing)return;
            container.style.display = "none";
            setTimeout(function(){
                if(_tant){
                    clearTimeout(_tant);
                    _tant = null;
                }
                each(container.find("div.chld"),function(){
                    this.style.display="none";
                });
                container.remove();
                container.style.display = "block";
            },10);
            showing = false;
            try{
                if(is_function(atr.onClose))atr.onClose.apply(null,[]);
            }catch(e){}
            (function(){
                if (browser.IE&&browser.version<9)return document.body;
                else return window;
            })().removeEvent("mousedown",mousedown);
            (function(){
                if (browser.IE&&browser.version<9)return document.body;
                else return window;
            })().removeEvent("scroll",scroll);
            (function(){
                if (browser.IE&&browser.version<9)return document.body;
                else return window;
            })().removeEvent("keydown",keydown);
            (function(fn) {
                if(browser.IE&&browser.version==9)window.removeEvent("focusout",fn);
                else if(browser.IE&&browser.version<9)document.removeEvent("focusout",fn);
                else window.removeEvent("blur",fn);
            })(blur);
            window.removeEvent("resize",hide);
            window.removeEvent("BKScroll",BKScroll);
            if(window.onScroll) window.onScroll.remove(scroll);
            window.removeEvent("ajaxunload",hide);
        }
        this.hideOptions = function(){
            hide();
        }
        this.addEvent("contextmenu",function(e){
            if(!atr.contextMenu&&!atr.both)return;
            var e = (e) ? e : window.event;
            var target= (e.target)?e.target:e.srcElement;
            while(target != container&&target!=document.body)target = target.parentNode;
            if(target==container){
                e_stop(e);
                return false;
            }
            if (e.pageX || e.pageY){
                posx = e.pageX;
                posy = e.pageY;
            }else if (e.clientX || e.clientY) 	{
                posx = e.clientX + document.body.scrollLeft
                    + document.documentElement.scrollLeft;
                posy = e.clientY + document.body.scrollTop
                    + document.documentElement.scrollTop;
            }
            posx -=window.getScrollLeft();
            posy -=window.getScrollTop();
            add(posx,posy);
            e_stop(e);
            return false;
        });
        this.addEvent("click",function(e){
            if(atr.contextMenu&&!atr.both)return;
            var rightclick;
            if (!e) var e = window.event;
            if (e.which) rightclick = (e.which == 3);
            else if (e.button) rightclick = (e.button == 2);
            if(rightclick)return;
            var target= (e.target)?e.target:e.srcElement;
            while(target != container&&target!=document.body)target = target.parentNode;
            if(target==container){
                e_stop(e);
                return false;
            }
            if (e.pageX || e.pageY){
                posx = e.pageX;
                posy = e.pageY;
            }else if (e.clientX || e.clientY) 	{
                posx = e.clientX + document.body.scrollLeft
                    + document.documentElement.scrollLeft;
                posy = e.clientY + document.body.scrollTop
                    + document.documentElement.scrollTop;
            }
            posx -=window.getScrollLeft();
            posy -=window.getScrollTop();
            add(posx,posy);
        });
        function mousedown(e){
            if(showing){
                var target= (e.target)?e.target:e.srcElement;
                while(target != container&&target!=document.body&&target)target = target.parentNode;
                if(target==container)return true;
                hide();
            }
        }
        function scroll(e){
            if(showing){
                var target= (e.target)?e.target:e.srcElement;
                while(target != container&&target!=document.body&&target)target = target.parentNode;
                if(target==container){
                    e_stop(e);
                    return false;
                }else hide();
            }
        }
        function keydown(e){
            if(showing){
                var code;
                if (!e) var e = window.event;
                if (e.keyCode) code = e.keyCode;
                else if (e.which) code = e.which;
                if(code == 27)hide();
                if(code == 40||code == 38||code == 37||code == 39)hide();
            }
        }
        function blur(e){
            if(!(browser.IE&&browser.version<=9))if(showing)hide();
        }
    });
    window._frw_options_extensions_add = function(name,fun,onShow,onClick){
        if(is_string(name)&&is_function(fun))extensions.push({name:name,fun:fun,onShow:onShow,onClick:onClick});
    }
})();

extendObject("addText",function(value){
    if(!is_string(value))return;
    var lines = value.split('\n');
    var parent = false;
    for (var i = 0; i < lines.length; ++i) {
        if(parent)this.appendChild(document.createElement('br'));
        this.appendChild(document.createTextNode(lines[i]));
        parent = true;
    }
});

extendObject("makeSizable",function(attr){
    var atr = {
        top:true,
        left:true,
        right:true,
        bottom:true,
        minHeight:null,
        minWidth:null,
        maxHeight:null,
        maxWidth:null,
        margin:3,
        onChange:null,
        onBeforeChange:null
    };

    for (var key in attr)atr[key] = attr[key];
    var t = false;
    var b = false;
    var r = false;
    var l = false;
    var down = false;
    var _self = this;
    this.addEvent("mouseout",function(e){
        if(!down){
            t = false;
            b = false;
            r = false;
            l = false;
            document.body.style.cursor = "auto";
        }
    });
    (function(){
        if (browser.IE&&browser.version<9)return document.body;
        else return window;
    })().addEvent("mouseup",function(e){
            down = false;
            t = false;
            b = false;
            r = false;
            l = false;
            document.body.style.cursor = "auto";
        });
    (function(){
        if (browser.IE&&browser.version<9)return document.body;
        else return window;
    })().addEvent("mousemove",function(e){
            if(down){
                if (e.pageX || e.pageY){
                    posx = e.pageX;
                    posy = e.pageY;
                }else if (e.clientX || e.clientY) 	{
                    posx = e.clientX + document.body.scrollLeft
                        + document.documentElement.scrollLeft;
                    posy = e.clientY + document.body.scrollTop
                        + document.documentElement.scrollTop;
                }
                var nw = null;
                var nh = null;
                if(l){
                    nw = (_w + (_x - posx));
                }else if(r){
                    nw = (_w - (_x - posx));
                }
                if(nw){
                    if(is_number(atr.minWidth)&&atr.minWidth>nw)nw = atr.minWidth;
                    if(is_number(atr.maxWidth)&&atr.maxWidth<nw)nw = atr.maxWidth;
                    _self.style.width = nw+"px";
                }
                if(t){
                    nh = (_h + (_y - posy));
                }else if(b){
                    nh = (_h - (_y - posy));
                }
                if(nh){
                    if(is_number(atr.minHeight)&&atr.minHeight>nh)nh = atr.minHeight;
                    if(is_number(atr.maxHeight)&&atr.maxHeight<nh)nh = atr.maxHeight;
                    _self.style.height = nh+"px";
                }
                if(is_function(atr.onChange))atr.onChange.apply(_self,[]);
            }
        });
    var _x = null;
    var _y = null;
    var _w = null;
    var _h = null;
    this.addEvent("mousedown",function(e){
        if(t||b||l||r){
            if (e.pageX || e.pageY){
                posx = e.pageX;
                posy = e.pageY;
            }else if (e.clientX || e.clientY) 	{
                posx = e.clientX + document.body.scrollLeft
                    + document.documentElement.scrollLeft;
                posy = e.clientY + document.body.scrollTop
                    + document.documentElement.scrollTop;
            }
            _x = posx;
            _y = posy;
            _h = parseFloat(this.getStyle("height"));
            _w = parseFloat(this.getStyle("width"));
            down = true;
            e.preventDefault ? e.preventDefault() : e.returnValue = false;
            return false;
        }
    });
    this.addEvent("mousemove",function(e){
        var result = true;
        if(is_function(atr.onBeforeChange))result = atr.onBeforeChange.apply(this,[]);
        if(result==false)return;
        if(down)return;
        if (e.pageX || e.pageY){
            posx = e.pageX;
            posy = e.pageY;
        }else if (e.clientX || e.clientY) 	{
            posx = e.clientX + document.body.scrollLeft
                + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop
                + document.documentElement.scrollTop;
        }
        var x = this.findAbsPosX();
        var y = this.findAbsPosY();
        var h = this.getHeight();
        var w = this.getWidth();
        var yet = false;
        l=r=t=b=false;
        if(atr.left&&posx-x<=atr.margin){
            yet =true;
            document.body.style.cursor = "w-resize";
            l=true;
        }
        if(atr.right&&posx-x>w-atr.margin){
            yet =true;
            document.body.style.cursor = "w-resize";
            r=true;
        }
        if(atr.top&&posy-y<=atr.margin){
            yet =true;
            document.body.style.cursor = "n-resize";
            t=true;
            if(l){
                document.body.style.cursor = "nw-resize";
            }else if(r){
                document.body.style.cursor = "ne-resize";
            }
        }
        if(atr.bottom&&posy-y>h-atr.margin){
            yet =true;
            document.body.style.cursor = "n-resize";
            b=true;
            if(l){
                document.body.style.cursor = "ne-resize";
            }else if(r){
                document.body.style.cursor = "nw-resize";
            }
        }
        if(!yet)document.body.style.cursor = "auto";
    });
});

(function(){
    window.Levenshtein = String.prototype.levenshtein = (function(){
        function forEach( array, fn ) { var i, length
            i = -1
            length = array.length
            while ( ++i < length )
                fn( array[ i ], i, array )
        }

        function map( array, fn ) { var result
            result = Array( array.length )
            forEach( array, function ( val, i, array ) {
                result.push( fn( val, i, array ) )
            })
            return result
        }

        function reduce( array, fn, accumulator ) {
            forEach( array, function( val, i, array ) {
                accumulator = fn( val, i, array )
            })
            return accumulator
        }

        // Levenshtein distance
        function Levenshtein( str_m , str_n ) { var previous, current, matrix;
            if(str_n==undefined){
                if(!(this instanceof String))throw "Invalid Args!!";
                str_n = str_m;
                str_m = this;
            }
            // Constructor
            matrix = this._matrix = []

            // Sanity checks
            if ( str_m == str_n )
                return this.distance = 0
            else if ( str_m == '' )
                return this.distance = str_n.length
            else if ( str_n == '' )
                return this.distance = str_m.length
            else {
                // Danger Will Robinson
                previous = [ 0 ]
                forEach( str_m, function( v, i ) { i++, previous[ i ] = i } )

                matrix[0] = previous
                forEach( str_n, function( n_val, n_idx ) {
                    current = [ ++n_idx ]
                    forEach( str_m, function( m_val, m_idx ) {
                        m_idx++
                        if ( str_m.charAt( m_idx - 1 ) == str_n.charAt( n_idx - 1 ) )
                            current[ m_idx ] = previous[ m_idx - 1 ]
                        else
                            current[ m_idx ] = Math.min
                                ( previous[ m_idx ]     + 1   // Deletion
                                    , current[  m_idx - 1 ] + 1   // Insertion
                                    , previous[ m_idx - 1 ] + 1   // Subtraction
                                )
                    })
                    previous = current
                    matrix[ matrix.length ] = previous
                })

                return this.distance = current[ current.length - 1 ]
            }
        }

        Levenshtein.prototype.toString = Levenshtein.prototype.inspect = function inspect ( no_print ) { var matrix, max, buff, sep, rows
            matrix = this.getMatrix()
            max = reduce( matrix,function( m, o ) {
                return Math.max( m, reduce( o, Math.max, 0 ) )
            }, 0 )
            buff = Array( ( max + '' ).length ).join( ' ' )

            sep = []
            while ( sep.length < (matrix[0] && matrix[0].length || 0) )
                sep[ sep.length ] = Array( buff.length + 1 ).join( '-' )
            sep = sep.join( '-+' ) + '-'

            rows = map( matrix, function( row ) { var cells
                cells = map( row, function( cell ) {
                    return ( buff + cell ).slice( - buff.length )
                })
                return cells.join( ' |' ) + ' '
            })

            return rows.join( "\n" + sep + "\n" )
        }

        Levenshtein.prototype.getMatrix = function () {
            return this._matrix.slice()
        }

        Levenshtein.prototype.valueOf = function() {
            return this.distance
        }

        Levenshtein.distance = function(s, t) {
            var d = []; //2d matrix

            // Step 1
            var n = s.length;
            var m = t.length;

            if (n == 0) return m;
            if (m == 0) return n;

            //Create an array of arrays in javascript (a descending loop is quicker)
            for (var i = n; i >= 0; i--) d[i] = [];

            // Step 2
            for (var i = n; i >= 0; i--) d[i][0] = i;
            for (var j = m; j >= 0; j--) d[0][j] = j;

            // Step 3
            for (var i = 1; i <= n; i++) {
                var s_i = s.charAt(i - 1);

                // Step 4
                for (var j = 1; j <= m; j++) {

                    //Check the jagged ld total so far
                    if (i == j && d[i][j] > 4) return n;

                    var t_j = t.charAt(j - 1);
                    var cost = (s_i == t_j) ? 0 : 1; // Step 5

                    //Calculate the minimum
                    var mi = d[i - 1][j] + 1;
                    var b = d[i][j - 1] + 1;
                    var c = d[i - 1][j - 1] + cost;

                    if (b < mi) mi = b;
                    if (c < mi) mi = c;

                    d[i][j] = mi; // Step 6

                    //Damerau transposition
                    if (i > 1 && j > 1 && s_i == t.charAt(j - 2) && s.charAt(i - 2) == t_j) {
                        d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + cost);
                    }
                }
            }

            // Step 7
            return d[n][m];
        };

        return Levenshtein

    })();
})();

String.prototype.getWidth = function(elm){
    var t = document.createElement("div");
    t.appendChild(document.createTextNode(this));
    t.style.position = "absolute";
    t.style.visibility = "hidden";
    t.style.border = t.style.margin = t.style.padding = "0px";
    document.body.appendChild(t);
    if(is_element(elm)){
        t.style.fontFamily = elm.getStyle("font-family");
        t.style.fontSize = elm.getStyle("font-size");
        t.style.fontSize = elm.getStyle("font-size");
        t.style.fontKerning = elm.getStyle("font-kerning");
        t.style.fontStretch = elm.getStyle("font-stretch");
        t.style.fontStyle = elm.getStyle("font-style");
        t.style.fontVariant = elm.getStyle("font-variant");
        try{t.style.fontWeight = elm.getStyle("font-weight");}catch(e){}
    }
    var w = t.getWidth();
    t.remove();
    return w;
};

(function(){
    function getTextNodesIn(node) {
        var textNodes = [];
        if (node.nodeType == 3) {
            textNodes.push(node);
        } else {
            var children = node.childNodes;
            for (var i = 0, len = children.length; i < len; ++i) {
                textNodes.push.apply(textNodes, getTextNodesIn(children[i]));
            }
        }
        return textNodes;
    }
    function setSelectionRange(el, start, end) {
        if (document.createRange && window.getSelection) {
            var range = document.createRange();
            range.selectNodeContents(el);
            var textNodes = getTextNodesIn(el);
            var foundStart = false;
            var charCount = 0, endCharCount;

            for (var i = 0, textNode; textNode = textNodes[i++]; ) {
                endCharCount = charCount + textNode.length;
                if (!foundStart && start >= charCount
                    && (start < endCharCount ||
                    (start == endCharCount && i < textNodes.length))) {
                    range.setStart(textNode, start - charCount);
                    foundStart = true;
                }
                if (foundStart && end <= endCharCount) {
                    range.setEnd(textNode, end - charCount);
                    break;
                }
                charCount = endCharCount;
            }

            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        } else if (document.selection && document.body.createTextRange) {
            var textRange = document.body.createTextRange();
            textRange.moveToElementText(el);
            textRange.collapse(true);
            textRange.moveEnd("character", end);
            textRange.moveStart("character", start);
            textRange.select();
        }
    }
    window.selection = {
        setSelectionRange:setSelectionRange,
        removeSelectionRange: function(){
            if (window.getSelection) {
                if (window.getSelection().empty) {  // Chrome
                    window.getSelection().empty();
                } else if (window.getSelection().removeAllRanges) {  // Firefox
                    window.getSelection().removeAllRanges();
                }
            } else if (document.selection) {  // IE?
                document.selection.empty();
            }
        }
    };
})();

window.urlencode = function(str) {
    str = str.toString().fullTrim();
    return encodeURIComponent(str)
        .replace(/!/g, '%21')
        .replace(/'/g, '%27')
        .replace(/\(/g, '%28')
        .replace(/\)/g, '%29')
        .replace(/\*/g, '%2A')
        .replace(/%20/g, '+');
}

window.htmlEntities = function (str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

window.Animate=(function(){
    var fun = function(){
        var elm = null;
        var type = [];
        each(arguments,function(){
            if(is_element(this))elm = this;
            if(this!=undefined&&this instanceof _animation)type.push(this);
        });
        this.start = function(){
            each(type,function(){
                var ___self = this;
                ___self.___before___();
                function an(){
                    ___self.___fun___(elm);
                    ___self.actual++;
                    if(___self.actual <= ___self.iterations)requestAnimationFrame(an);
                    else{
                        ___self.actual = 0;
                        ___self.___after___();
                    }
                }
                requestAnimationFrame(an);
            });
        };
    };
    var _animation = (function(){
        var fun = function(){
            this.iterations = 50;
            this.actual = 0;
            var __after = null;
            this.after = function(value){
                if(value!=undefined){
                    if(is_function(value))__after = value;
                }else return __after;
            }
            this.___after___ = function(){
                if(__after!=null)__after();
            };
            var __before = null;
            this.before = function(value){
                if(value!=undefined){
                    if(is_function(value))__before = value;
                }else return __before;
            }
            this.___before___ = function(){
                if(__before!=null)__before();
            };
            this.___fun___=function(elm){};
        };
        return fun;
    })();
    fun.extend=function(name,fn){
        if(!is_string(name))throw "Invalid Arguments!!";
        if(typeof fn != "function"&&typeof fn.prototype != "object")throw "Invalid Arguments!!";
        fun[name]= fn;
        fun[name]._inherit_(_animation);
    };
    fun.extend("appear",(function(){
        var fun = function(){
            this.constructor.__super__.call(this,arguments);
            this.___fun___=function(elm){
                if(elm["____display____"]==undefined){
                    elm["____display____"] = elm.getStyle("display").toLowerCase();
                    if(elm["____display____"] == "none") elm["____display____"] = "block";
                }
                elm.style.display = elm["____display____"];
                elm.style.opacity = (1-((this.iterations-this.actual)/this.iterations));
                if(browser.IE&&browser.version<9){
                    try{
                        elm.filters.item("alpha").opacity=(1-((this.iterations-this.actual)/this.iterations))*100;
                    }catch(e){
                        elm.style.filter = "alpha(opacity=" +((1-((this.iterations-this.actual)/this.iterations))*100) + ")";
                    }
                }
                if(elm.getStyle("visibility").toLowerCase()!="visible")elm.style.visibility = "visible"
            };
        };
        return fun;
    })());
    fun.extend("earthquake",(function(){
        var tmt = null;
        var fun = function(amp,len){
            if(!is_number(amp))amp = 5;
            if(!is_number(len))len = 5;
            this.constructor.__super__.call(this,arguments);
            this.___fun___=function(elm){
                if(tmt==null){
                    tmt=parseFloat(elm.getStyle("margin-top"));
                    if(isNaN(tmt))tmt = 0;
                }
                var w = (1-(Math.abs((this.iterations/2)-this.actual)/(this.iterations/2))) * parseFloat(Math.sin(this.actual*(len /this.iterations)*Math.PI).toFixed(4));
                elm.style.marginTop = (tmt+(w*amp)) + "px";
            };
        };
        return fun;
    })());
    fun.extend("springV",(function(){
        var tmt = null;
        var fun = function(amp,len,inverted){
            if(!is_number(amp))amp = 5;
            if(!is_number(len))len = 5;
            inverted = inverted == true?true:false;
            this.constructor.__super__.call(this,arguments);
            this.___fun___=function(elm){
                if(tmt==null){
                    tmt=parseFloat(elm.getStyle("margin-top"));
                    if(isNaN(tmt))tmt = 0;
                }
                var w = (1-(this.actual/this.iterations))*(Math.pow(Math.E,-this.actual*3/this.iterations)) * parseFloat(Math.cos(this.actual*(len /this.iterations)*Math.PI).toFixed(4));
                if(!inverted)elm.style.marginTop = (tmt+(w*amp)) + "px";
                else elm.style.marginTop = (tmt-(w*amp)) + "px";
            };
        };
        return fun;
    })());
    fun.extend("springH",(function(){
        var tmt = null;
        var fun = function(amp,len,inverted){
            if(!is_number(amp))amp = 5;
            if(!is_number(len))len = 5;
            inverted = inverted == true?true:false;
            this.constructor.__super__.call(this,arguments);
            this.___fun___=function(elm){
                if(tmt==null){
                    tmt=parseFloat(elm.getStyle("margin-left"));
                    if(isNaN(tmt))tmt = 0;
                }
                var w = (1-(this.actual/this.iterations))*(Math.pow(Math.E,-this.actual*3/this.iterations)) * parseFloat(Math.cos(this.actual*(len /this.iterations)*Math.PI).toFixed(4));
                if(!inverted)elm.style.marginLeft = (tmt+(w*amp)) + "px";
                else elm.style.marginLeft = (tmt-(w*amp)) + "px";
            };
        };
        return fun;
    })());
    fun.extend("disappear",(function(){
        var fun = function(hide){
            hide = hide == false?false:true;
            this.constructor.__super__.call(this,arguments);
            this.___fun___=function(elm){
                if(elm["____display____"]==undefined){
                    elm["____display____"] = elm.getStyle("display").toLowerCase();
                    if(elm["____display____"] == "none") elm["____display____"] = "block";
                }
                if(elm.getStyle("display").toLowerCase()=="none")elm.style.display = elm["____display____"];
                elm.style.opacity = ((this.iterations-this.actual)/this.iterations);
                if(browser.IE&&browser.version<9){
                    try{
                        elm.filters.item("alpha").opacity=((this.iterations-this.actual)/this.iterations)*100;
                    }catch(e){
                        elm.style.filter = "alpha(opacity=" +(((this.iterations-this.actual)/this.iterations)*100) + ")";
                    }
                }
                if(this.iterations == this.actual&&hide){
                    elm.style.display = "none";
                    elm.style.opacity = 1;
                    if(browser.IE&&browser.version<9){
                        try{
                            elm.filters.item("alpha").opacity=100;
                        }catch(e){
                            elm.style.filter = "alpha(opacity=" +100 + ")";
                        }
                    }
                }
            };
        };
        return fun;
    })());
    fun.extend("scale",(function(){
        var fun = function(scale, back){
            back = back == true?true:false;
            this.constructor.__super__.call(this,arguments);
            this.___fun___=function(elm){
                var value = (1+((scale-1)*(1-((this.iterations-this.actual)/this.iterations))));
                elm.style.transform = 'scale(' + value + ')';
                elm.style['-o-transform'] = 'scale(' + value + ')';
                elm.style['-webkit-transform'] = 'scale(' + value + ')';
                elm.style['-ms-transform'] = 'scale(' + value + ')';
                elm.style['-moz-transform'] = 'scale(' + value + ')';
                if(this.iterations==this.actual&&back){
                    elm.style.transform = 'scale(1)';
                    elm.style['-o-transform'] = 'scale(1)';
                    elm.style['-webkit-transform'] = 'scale(1)';
                    elm.style['-ms-transform'] = 'scale(1)';
                    elm.style['-moz-transform'] = 'scale(1)';
                }
            };
        };
        return fun;
    })());
    fun.extend("apply",(function(){
        var fun = function(atr,shake,len){
            if(!is_object(atr))throw "Invalid Arguments!!";
            var values = [];
            shake = shake == true?true:false;
            if(!is_number(len))len = 30;
            var tmt = [];
            var yet = false;
            this.constructor.__super__.call(this,arguments);
            this.___fun___=function(elm){
                try{
                    if(!yet)for (var key in atr) {
                        var ant = elm.getStyle(key);
                        if(ant == "auto")ant = 0;
                        var val = parseFloat(ant);
                        var val2 = parseFloat(atr[key]);
                        if(!isNaN(val)){
                            atr[key] = atr[key].toLowerCase();
                            var key_ = key.replace(/-([a-z])/, function(v) {v = v.toUpperCase();return v.replace(/-([A-Z])/,"$1"); });
                            elm.style[key_]=atr[key];
                            val2 = parseFloat(elm.getStyle(key));
                            elm.style[key_]=ant;
                            values.push({key:key_,value:val,value2:val2,old:atr[key]});
                        }
                    }
                    for(var __i__=0;__i__<values.length;__i__++){
                        if(!yet&&shake){
                            elm.style[values[__i__].key]=values[__i__].old;
                        }
                        if(!shake)elm.style[values[__i__].key]=(values[__i__].value+((values[__i__].value2-values[__i__].value)*(1-((this.iterations-this.actual)/this.iterations)))) + "px";
                        else{
                            if(!yet){
                                if(values[__i__].key.match(/[Ll]eft|[Rr]ight|width/))tmt.push({stl:"marginLeft",val:parseFloat(elm.getStyle("margin-left"))});
                                else tmt.push({stl:"marginTop",val:parseFloat(elm.getStyle("margin-top"))});
                            }
                            var w = (1-(this.actual/this.iterations))*(Math.pow(Math.E,-this.actual*3/this.iterations)) * parseFloat(Math.cos(this.actual*(len /this.iterations)*Math.PI).toFixed(4));
                            var ts = Math.abs(values[__i__].value-values[__i__].value2);
                            if(ts>100)ts=90;
                            elm.style[tmt[__i__].stl] = (tmt[__i__].val+(w*ts)) + "px";
                        }
                        if(this.iterations==this.actual){
                            try{
                            elm.style[tmt[__i__].stl] = tmt[__i__].val + "px";
                            elm.style[values[__i__].key]=values[__i__].old;
                            }catch(e){}
                        }
                    }
                }catch (e){}
                yet=true;

            };
        };
        return fun;
    })());
    fun.animateArray = function(start, end, iterations, step){
        var fun = (function(){
            var abort = false;
            this.abort=function(){abort = true;}
            var actual = 0;
            function an(){
                if(abort)return;
                var result = [];
                for(var i=0;i<start.length;i++){
                    result[i]=start[i]+((end[i]-start[i])*(1-((iterations-actual)/iterations)))
                }
                step(result,actual);
                actual++;
                if(actual <= iterations)requestAnimationFrame(an);
            }
            requestAnimationFrame(an);
        })();
        return fun;
    };
    fun.appear._inherit_(_animation);
    return fun;
})();

