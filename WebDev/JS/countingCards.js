var count = 0;

function cc(card) {
  // Only change code below this line

    switch(card){
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
              {
                if(count++>0)
                  return String(count) + " " + "Bet";
                else
                  return String(count) + " " + "Hold";
              }
          case 7:
          case 8:
          case 9:
                  {
                    if(count>0)
                      return String(count) + " " + "Bet";
                    else
                      return String(count) + " " + "Hold";
                  }

          case 10:
          case 'J':
          case 'Q':
          case 'K':
          case 'A':
              {
                if(count-->0){
                  return String(count) + " " + "Bet";
                }
                else{
                  return String(count) + " " + "Hold";
                }
              }
    }
}

cc(2); cc(3); cc(7); cc('K'); cc('A');
