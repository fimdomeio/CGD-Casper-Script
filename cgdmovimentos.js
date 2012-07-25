// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, version 3 of the License.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.


var casper = require("casper").create();

casper.start('https://www.cgd.pt/Pages/Default.aspx', function() {
   this.fill('.login_outer_box form', {
      'USERNAME':    'XXXXXXX', //Contract number (todo: make it recieve an argument)
   }, true);
});

casper.then(function(){
	 this.click('#j_id36');
	 this.clickLabel('X', 'div'); //Password (todo make it a recieve argument)
	 this.clickLabel('X', 'div');
	 this.clickLabel('X', 'div');
	 this.clickLabel('X', 'div');
	 this.clickLabel('X', 'div');
	 this.clickLabel('X', 'div');
	 this.click('.VirtualKbd_Enter_tecla input');
});

casper.waitUntilVisible('.mensBoas',function(){ // Wait until login is completed
},
function(){
	this.echo('Não Consigo ligar ao servidor');	
},
15000);

//Go to the movimentos Page
casper.thenOpen('https://caixadirectaonline.cgd.pt/cdo/private/contasaordem/consultaSaldosMovimentos.seam', function(){
	var results = this.fetchText('.mgtop tr .texttable:nth-child(-n+4)'); //get results
	//
	// TODO Get description from title and not from content since it's more complete
	//

	results = results.replace(/\t/g, "");
	results = results.split('\n');
	var output = "\n";
	var j = 0;
	while(results.length >=1){
		var line = results.shift();
		if(j == 2){
			emptyline = /^\W+$/;
			if(!emptyline.test(line)){
				output += "-"; // adding a minus when it's a payment
			}
		}
		output += line;
		j++;
		if(j == 4){
			j = 0;
			output += "\n";
		}else{
			output += ' ';
		}
	}
	this.echo(output);
});

// ADD LOGOUT

casper.run(function() {
		    this.exit();
});

