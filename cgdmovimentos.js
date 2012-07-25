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


var casper = require("casper").create({
//Enable in development
//	verbose: true,
//	logLevel: "debug"
});
var contractnr; // Will hold contract number
var password; // Will hold the password


if(casper.cli.has(0) && casper.cli.has(1)){
	contractnr = casper.cli.get(0);
	password = casper.cli.get(1);
	password = password.split(""); //Split into array since password caracters are sent individually
}else {
	casper.echo('Usage is "casperjs cgdmovimentos.js ‹contract-nr› ‹password›');
	casper.exit();
}


//Inserts contract Number on the first page
casper.start('https://www.cgd.pt/Pages/Default.aspx', function() {
   this.echo(contractnr);
   this.fill('.login_outer_box form', {
      'USERNAME': contractnr.toString()
	}, true);
});

casper.then(function(){
	//this.click('#j_id36');
	var c = password.length;
	this.echo(c);
	for(var i = 0; i < c; i++){
		//click each password character on the virtual keyboard
		this.clickLabel(password[i], 'div'); 
	}
	this.click('.VirtualKbd_Enter_tecla input');
});

//Waits until login is completed
casper.waitUntilVisible('.mensBoas',function(){
},
function(){
	//
	// TODO has password failed was it a problem with the cgd server?
	//
	this.echo("Can't authenticate to server.");	
},
15000);

//Go to the movimentos Page
//
// TODO allow to specify different date ranges with arguments
//
casper.thenOpen('https://caixadirectaonline.cgd.pt/cdo/private/contasaordem/consultaSaldosMovimentos.seam', function(){
	var results = this.fetchText('.mgtop tr .texttable:nth-child(-n+4)'); //get results
	//
	// TODO Get description from title attribute instead of the content since it's more complete
	//
	// TODO Format the results as json for easier manipulation. Configurable by console argument
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

// ADD LOGOUT. I think it's redundant since apparently phantom doesn't save anything in cache

casper.run(function() {
		    this.exit();
});

