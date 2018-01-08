import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',
  susuRegex: /susu collector/i ,
  guineaRegex: /guinea fowl/i ,
  eqwipHubRegex: /a training program on entrepreneurship with EQWIP  HUBs/i, //Adding Extra string
  eqwipRegex: /eqwip hubs|entrepreneurship training program with EQWIP  HUBs/i ,
  travelRegex: /traveling around Northern Ghana|getting around Northern Ghana is not easy./i ,
  whatsAppRegex: /WhatsApp/i ,
  eqwipComputerRegex: /EQWIP  HUBs computer lab/i ,
  goroRegex: /Goro Boys/i,
  norseRegex: /NORSAAC/,
  susuIndicator: "#SUSU#",
  investRegex: /investor deposits were being diverted into the bank accounts of firm managers/,
  serviceRegex: /national service/i,
  motorRegex: /Motorking/i,
  tamaleRegex: /Tamale/i,
  moreRegex: /and  more/i,
  yamRegex: /a ‘yam’/i,
  tuoZaafiRegex: /tuo zaafi/i,
  bribeRegex: /Offer the officer a ₵150 bribe|Offer a ₵150 bribe/i,
  creditProRegex: /very difficult for female entrepreneurs to access credit through formal financial institutions in Northern Ghana/i,
  accraRegex:/  Accra/i, //pending
  bootCampRegex:/Enroll in a coding bootcamp/i,
  codeSchoolRegex: /The Code School/i,
  floodAccraRegex: /major floods sweep across Accra/i,
  eqwipHubNetworkRegex: /EQWIP HUB Network/i,
  eqwipHubCLabRegex: /EQWIP HUB computer lab/i,
  launchTraningRegex: /she's ready to launch the vocational training component of her business/i,
  crunchesNumberRegex: /She crunches the numbers/i,
  renderDialog: null,
  newRegexAdded : {
    familyOfFarmers: {
      regex : /guinea  fowl  chicks/i,
      modelText : 'Guinea fowl is a species of bird indigenous to Africa. Lean, nutritious, and rich in fatty acids, guinea fowl is an extremely popular bird in Ghana, and a favorite at roadside barbecue stands and upscale restaurants. Raising guinea fowl is also a relatively low-maintenance gig, when it comes to livestock. <br><br> The average guinea fowl also produces 55 to 100 eggs per year.'
    }
  },
  partials: Ember.computed('inputText', function(){
    let inputText = this.get('inputText');

    if(inputText == null) {
      return [];
    }

    inputText = this.addSusuMarkdown(inputText);

    let partialStrings = inputText.split(this.get('susuIndicator'));

    partialStrings = partialStrings.map((string) => {
      return string.split("#GUINEA#");
    });

    var flattened = [].concat.apply([], partialStrings);

    flattened = flattened.map((string) => {
      return string.split("#EQWIP#");
    });

    flattened = [].concat.apply([], flattened);

    flattened = flattened.map((string) => {
      return string.split("#INVEST#");
    });

    flattened = [].concat.apply([], flattened);

    flattened = flattened.map((string) => {
      return string.split("#SERVICE#");
    });

    flattened = [].concat.apply([], flattened);

    flattened = flattened.map((string) => {
      return string.split("#MOTOR#");
    });

    flattened = [].concat.apply([], flattened);

    flattened = flattened.map((string) => {
      return string.split("#COMPUTER#");
    });

    flattened = [].concat.apply([], flattened);

    flattened = flattened.map((string) => {
      return string.split("#TRAVEL#");
    });

    flattened = [].concat.apply([], flattened);

    flattened = flattened.map((string) => {
      return string.split("#WHATSAPP#");
    });

    flattened = [].concat.apply([], flattened);

    flattened = flattened.map((string) => {
      return string.split("#GORO#");
    });

    flattened = [].concat.apply([], flattened);

    flattened = flattened.map((string) => {
      return string.split("#NORSE#");
    });

    flattened = [].concat.apply([], flattened);

    var modelKeyName = ["#TAMALE#","#EQWIPHUB#","#ANDMORE#","#YAM#","#TUAZAAFI#",
                        "#CREDITPRO#","#BRIBE#","#ACCRA#","#BOOTCAMP#","#CODESCHOOL#",
                        "#FLOODACCRA#","#EQWIPHUBNETWORK#","#LAUNCHTRANING#","#EQWIPHUBCLAB#",
                        "#CRUNCHESNUMBER#"];


    //Adding Newly added Model Key
    let tempVariable = this.get('newRegexAdded');
    for (let key in tempVariable) {
      modelKeyName.push('#'+key.toUpperCase()+'#');
    }

    //console.log('Model Key')
    //console.log(modelKeyName);

    for (var i = 0; i < modelKeyName.length; i++) {
      flattened = flattened.map((string) => {
        return string.split(modelKeyName[i]);
      });
      flattened = [].concat.apply([], flattened);
    }


    return flattened.map((string) => {

      //console.log(Ember.assign({custom:'custom'}, this.get('newRegexAdded')));

      let newMapObj = {};
      let linkableStatus = false;
      let modelType = false;

      //Adding Newly added Model Key
      let tempVariable = this.get('newRegexAdded');
      for (let key in tempVariable) {
        let capitalizedKey = key[0].toUpperCase() + key.slice(1);
        let searchStatus = tempVariable[key]['regex'].test(string);
        newMapObj['is'+capitalizedKey] = searchStatus;
        linkableStatus = linkableStatus || searchStatus;
        if(searchStatus){
          modelType = key;
        }
      }

      return Ember.assign(newMapObj,{
        content: string,
        modelType: modelType,
        isSusu: this.get('susuRegex').test(string),
        isGuinea: this.get('guineaRegex').test(string),
        isEqwip: this.get('eqwipRegex').test(string),
        isComputer: this.get('eqwipComputerRegex').test(string),
        isTravel: this.get('travelRegex').test(string),
        isInvest: this.get('investRegex').test(string),
        isWhatsApp: this.get('whatsAppRegex').test(string),
        isGoro: this.get('goroRegex').test(string),
        isService: this.get('serviceRegex').test(string),
        isMotor: this.get('motorRegex').test(string),
        isNorse: this.get('norseRegex').test(string),
        isTamale: this.get('tamaleRegex').test(string),
        isEqwipHub: this.get('eqwipHubRegex').test(string),
        isMore: this.get('moreRegex').test(string),
        isYam: this.get('yamRegex').test(string),
        isTuaZaafi: this.get('tuoZaafiRegex').test(string),
        isCreditPro: this.get('creditProRegex').test(string),
        isOfferBribe: this.get('bribeRegex').test(string),
        isAccra: this.get('accraRegex').test(string), 
        isBootCamp: this.get('bootCampRegex').test(string),
        isCodeSchool: this.get('codeSchoolRegex').test(string),
        isFloodAccra: this.get('floodAccraRegex').test(string),
        isLaunchTraning: this.get('launchTraningRegex').test(string),
        isEwipHubCLab: this.get('eqwipHubCLabRegex').test(string),
        isEqwipHubNetwork: this.get('eqwipHubNetworkRegex').test(string),
        isCrunchesNumber: this.get('crunchesNumberRegex').test(string),
        isLinkable: this.get('susuRegex').test(string) ||
          this.get('guineaRegex').test(string) ||
          this.get('eqwipRegex').test(string) ||
          this.get('eqwipComputerRegex').test(string) ||
          this.get('travelRegex').test(string) ||
          this.get('whatsAppRegex').test(string) ||
          this.get('goroRegex').test(string) ||
          this.get('norseRegex').test(string) ||
          this.get('serviceRegex').test(string) ||
          this.get('motorRegex').test(string) ||
          this.get('investRegex').test(string) ||
          this.get('tamaleRegex').test(string) ||
          this.get('moreRegex').test(string) ||
          this.get('yamRegex').test(string) ||
          this.get('tuoZaafiRegex').test(string) ||
          this.get('creditProRegex').test(string) ||
          this.get('accraRegex').test(string) ||
          this.get('bribeRegex').test(string) ||
          this.get('bootCampRegex').test(string) ||
          this.get('codeSchoolRegex').test(string) ||
          this.get('floodAccraRegex').test(string) ||
          this.get('eqwipHubNetworkRegex').test(string) ||
          this.get('eqwipHubCLabRegex').test(string) ||
          this.get('launchTraningRegex').test(string) ||
          this.get('crunchesNumberRegex').test(string) ||
          this.get('eqwipHubRegex').test(string) ||
          linkableStatus
      });
    });
  }),

  addSusuMarkdown: function (text) {
    if (!(text.constructor === String)) {
      text = text.string
    }
    text = text.replace(this.get('susuRegex'), function(s) {
      return "#SUSU#" + s + "#SUSU#";
    });

    text = text.replace(this.get('guineaRegex'), function(s) {
      return "#GUINEA#" + s + "#GUINEA#";
    });

    text = text.replace(this.get('eqwipComputerRegex'), function(s) {
      return "#COMPUTER#" + s + "#COMPUTER#";
    });

    text = text.replace(this.get('eqwipRegex'), function(s) {
      return "#EQWIP#" + s + "#EQWIP#";
    });

    text = text.replace(this.get('investRegex'), function(s) {
      return "#INVEST#" + s + "#INVEST#";
    });

    text = text.replace(this.get('travelRegex'), function(s) {
      return "#TRAVEL#" + s + "#TRAVEL#";
    });

    text = text.replace(this.get('whatsAppRegex'), function(s) {
      return "#WHATSAPP#" + s + "#WHATSAPP#";
    });

    text = text.replace(this.get('goroRegex'), function(s) {
      return "#GORO#" + s + "#GORO#";
    });

    text = text.replace(this.get('norseRegex'), function(s) {
      return "#NORSE#" + s + "#NORSE#";
    });

    text = text.replace(this.get('serviceRegex'), function(s) {
      return "#SERVICE#" + s + "#SERVICE#";
    });

    text = text.replace(this.get('motorRegex'), function(s) {
      return "#MOTOR#" + s + "#MOTOR#";
    });

    var regexToKey = {
      tamaleRegex: "TAMALE",
      eqwipHubRegex: "EQWIPHUB",
      moreRegex: "ANDMORE",
      yamRegex: "YAM",
      tuoZaafiRegex: "TUAZAAFI",
      creditProRegex: "CREDITPRO",
      bribeRegex: "BRIBE",
      accraRegex: "ACCRA",
      bootCampRegex: "BOOTCAMP",
      codeSchoolRegex: "CODESCHOOL",
      floodAccraRegex: "FLOODACCRA",
      eqwipHubNetworkRegex: "EQWIPHUBNETWORK",
      launchTraningRegex: "LAUNCHTRANING",
      eqwipHubCLabRegex: "EQWIPHUBCLAB",
      crunchesNumberRegex: "CRUNCHESNUMBER"
    }

    for(var x in regexToKey){
      text = text.replace(this.get(x), function(s) {
        return "#"+regexToKey[x]+"#" + s + "#"+regexToKey[x]+"#";
      });
    }


    //Adding Newly added Model Key
    let tempVariable = this.get('newRegexAdded');
    for (let key in tempVariable) {
      text = text.replace(tempVariable[key]['regex'], function(s) {
        return "#"+key.toUpperCase()+"#" + s + "#"+key.toUpperCase()+"#";
      });
    }


    return text;
  },

  actions: {
    renderModal(whichModal) {
      let modelContent = false;
      if( whichModal in this.get('newRegexAdded') ){
        modelContent = this.get('newRegexAdded')[whichModal]['modelText'];
      }
      this.get('renderDialog')(whichModal,modelContent);
    }
  }
});
