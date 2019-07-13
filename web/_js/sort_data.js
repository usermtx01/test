/**
 * @package    Sort_Data (JavaScript)
 * @version    2.0
 * @date       Sun, 23 Jun 2019 13:18:51 +0100, Slovakia
 * @author     Robert Mesaros
 * @copyright  Copyright © 2019 Robert Mesaros, rmSOFT
 * @web        http://www.rmsoft.sk
 * @link       http://www.rmsoft.sk/en/portfolio/programming-work/web-services/data-sorting-in-slovak-and-czech-alphabet
 *
 * @donate     https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=BB4D8Y28YZDH6
 *
 * @license    MIT: http://mit-license.org/
 *             Permission is hereby granted, free of charge, to any person obtaining a copy of
 *             this software and associated documentation files (the "Software"), to deal in
 *             the Software without restriction, including without limitation the rights to use,
 *             copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
 *             Software, and to permit persons to whom the Software is furnished to do so,
 *             subject to the following conditions:
 *
 *             The above copyright notice and this permission notice shall be
 *             included in all copies or substantial portions of the Software.
 *
 *             THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 *             INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 *             PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 *             HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 *             OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 *             SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @code       text/javascript; charset=UTF-8
 */


let objABC = {};

// definovanie volitelnej specifikacie triedenia zo suboru 'alphabet.js'
// *************************************************************************************************************************
// objABC = objABC_sk_cz__0Aa; // 1 (medzera - cislice - velke a male znaky abecedy striedavo)
// objABC = objABC_sk_cz__0aA; // 2 (medzera - cislice - male a velke znaky abecedy striedavo)
// objABC = objABC_sk_cz__0A_a; // 3 (medzera - cislice - velke znaky abecedy - male znaky abecedy)
// objABC = objABC_sk_cz__0a_A; // 4 (medzera - cislice - male znaky abecedy - velke znaky abecedy)
// objABC = objABC_en__A_a; // 5 (medzera - velke znaky anglickej abecedy - male znaky anglickej abecedy)
// objABC = objABC__ASCII; // 6 (ASCII)
// objABC = objABC_sk_cz__Any; // 7 (medzera - pomlcka - vlastne cislice - vlastne znaky abecedy :)
// *************************************************************************************************************************

let sizeChars = 0;

let str_c1_sk_cz = "cC", str_c2_sk_cz = "hH";
let str_d1_sk_cz = "dD", str_d2_sk_cz = "zZžŽ";

let i = 0;
let j = 0;
let size_a, size_b;
let char_a, char_b;
let code_a, code_b;

function setupABC() {
    objABC.alphabet = {};

    sizeChars = objABC.chars.length;
// console.log('sizeChars = ' + sizeChars); // sx32_clr
    for (let i = 0; i < sizeChars; i++) {
        objABC.alphabet[objABC.chars[i]] = i + 1;
    }
// console.table(objABC.alphabet); // sx32_clr
}

function sortData(a, b, way) {
    way = way || 1; // (way = 1) = ascending (vzostupne) A-Z [default],    (way = -1) = descending (zostupne) Z-A
// console.log('way = ' + way); // sx32_clr

    if (!objABC.upper_lower) {
        a = a.toUpperCase();
        b = b.toUpperCase();
    }
// console.log('a = ' + a); // sx32_clr
// console.log('b = ' + b); // sx32_clr

    if (a === b) return 0;

    i = 0;
    j = 0;

    size_a = a.length;
    size_b = b.length;
// console.log('size_a = ' + size_a + '   size_b = ' + size_b); // sx32_clr

    while (i < size_a && j < size_b) {
        char_a = a[i];
// console.log('i = ' + i + '   char_a = ' + char_a); // sx32_clr
        if (objABC.spec) {
            if (str_c1_sk_cz.indexOf(a[i]) >= 0) { // ch
                if ((i < size_a - 1) && (str_c2_sk_cz.indexOf(a[i + 1]) >= 0)) {
                    char_a = a[i].concat(a[i + 1]);
// console.log('   char_a = ' + char_a); // sx32_clr
                    i++;
                }
            }
            else if (str_d1_sk_cz.indexOf(a[i]) >= 0) { // dz, dž
                if ((i < size_a - 1) && (str_d2_sk_cz.indexOf(a[i + 1]) >= 0)) {
                    char_a = a[i].concat(a[i + 1]);
// console.log('   char_a = ' + char_a); // sx32_clr
                    i++;
                }
            }
        }
        code_a = objABC.alphabet[char_a];
// console.log('code_a = ' + code_a); // sx32_clr

        char_b = b[j];
// console.log('j = ' + j + '   char_b = ' + char_b); // sx32_clr
        if (objABC.spec) {
            if (str_c1_sk_cz.indexOf(b[j]) >= 0) { // ch
                if ((j < size_b - 1) && (str_c2_sk_cz.indexOf(b[j + 1]) >= 0)) {
                    char_b = b[j].concat(b[j + 1]);
// console.log('   char_b = ' + char_b); // sx32_clr
                    j++;
                }
            }
            else if (str_d1_sk_cz.indexOf(b[j]) >= 0) { // dz, dž
                if ((j < size_b - 1) && (str_d2_sk_cz.indexOf(b[j + 1]) >= 0)) {
                    char_b = b[j].concat(b[j + 1]);
// console.log('   char_b = ' + char_b); // sx32_clr
                    j++;
                }
            }
        }
        code_b = objABC.alphabet[char_b];
// console.log('code_b = ' + code_b); // sx32_clr

        code_a = (code_a) ? code_a : char_a.charCodeAt(0) + sizeChars;
        code_b = (code_b) ? code_b : char_b.charCodeAt(0) + sizeChars;
// console.log('1 code_a = ' + code_a + '   code_b = ' + code_b); // sx32_clr

        if (code_a !== code_b) break;
        i++;
        j++;
    }

// if (i === size_a) console.log('return = ' + -way); // sx32_clr
// if (j === size_b) console.log('return = ' + way); // sx32_clr
    if (i === size_a) return -way;
    if (j === size_b) return way;

// console.log('code_a * way - code_b * way = ' + (code_a * way - code_b * way)); // sx32_clr
    return code_a * way - code_b * way;
// pri way=1 (vzostupne) return hodnota > 0 prehadzuje prvky triedenia - sx32_clr
}

setupABC();
