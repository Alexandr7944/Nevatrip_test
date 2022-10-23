class Order{
    constructor(duringOneTrip = 50) {
        this.route = 'из A в B';
        this.timeOfDeparture = [];  //время выезда
        this.timeOfTheRoad;         //время в дороге
        this.departureTime;         //время отправления
        this.timeOfArrival;         //время прибытия
        this.number;
        this.equalPrice;
        this.duringOneTrip = duringOneTrip;
        this.button();
        this.routeABA();
        this.start();
    }

    start() {
        let timeAB = document.querySelector('.timeAB');
        let timeBA = document.querySelector('.timeBA');
        timeBA.classList.add('close');

        document.querySelector('#route').addEventListener('click', () => {
            if(document.querySelector('#route').value === 'из A в B') {
                timeAB.classList.remove('close');
                timeBA.classList.add('close');
                this.route = document.querySelector('#route').value;
            }else if(document.querySelector('#route').value === 'из B в A') {
                timeAB.classList.add('close');
                timeBA.classList.remove('close');
                this.route = document.querySelector('#route').value;
            }else{
                timeAB.classList.remove('close');
                timeBA.classList.remove('close');
                this.route = document.querySelector('#route').value;
            }
            document.querySelector('#timeAB').value = '';
            document.querySelector('#timeBA').value = '';
        })
    }

    routeABA() {
        document.querySelector('#timeAB').onclick = () => {
            if(this.route === "из A в B и обратно в А") {
                let childrenValueBA = Array.from(document.querySelector('#timeBA').children);
                let minTime = this.timer(document.querySelector('#timeAB').value) + this.duringOneTrip * 60 * 1000;
                document.querySelector('#timeBA').value = '';
                childrenValueBA.forEach(element => {
                    this.timer(element.value) < minTime ? element.classList.add('close') : element.classList.remove('close');
                })
            }
        }
    }

    calcTimeOfTheRoad() {
        if(this.route === 'из A в B') {
            this.timeOfDeparture[0] = this.timer(document.querySelector('#timeAB').value);
            this.timeOfDeparture.splice(1, 1);
            this.timeOfTheRoad = this.duringOneTrip;
        }else if(this.route === 'из B в A') {
            this.timeOfDeparture[0] = this.timer(document.querySelector('#timeBA').value);
            this.timeOfDeparture.splice(1, 1);
            this.timeOfTheRoad = this.duringOneTrip;
        }else{
            this.timeOfDeparture[0] = this.timer(document.querySelector('#timeAB').value);
            this.timeOfDeparture[1] = this.timer(document.querySelector('#timeBA').value);
            this.timeOfTheRoad = (this.timeOfDeparture[1] - this.timeOfDeparture[0]) / 60000 + this.duringOneTrip;
        }
    }

    timer(t) {
        let date = document.querySelector('#date').value;
        let [hh, min] = t.split(':');
        return new Date(date).setHours(hh,min);
    }

    // Не нашел споособа решения данной задачи "Важно, время показываем в часовом поясе пользователя."

    button() {
        document.querySelector('button').onclick = () => {
            this.number = document.querySelector('#num').value;
            this.calcTimeOfTheRoad();
            this.price();
            this.getOut();
        }
    }

    price() {
        let ticketPrice = (this.route === "из A в B и обратно в А") ? 1200 : 700;
        this.equalPrice = ticketPrice * this.number;
        console.log(this);
    }

    calcMillisecondsToTime(milisec) {
        let hh = new Date(milisec).getHours();
        let min = new Date(milisec).getMinutes();
        hh = hh < 10 ? '0' + hh : hh;
        min = min < 10 ? '0' + min : min;
        return hh + '-' + min;
    }

    calcMinToTime(minIn) {
        let hh = minIn > 60 ? Math.floor(minIn  / 60 ) % 24 : 0;
        let min = minIn % 60 ;
        let hours;
        let minutes;
        // hh = hh < 10 ? '0' + hh : hh;
        min = min < 10 ? '0' + min : min;
        
        if(min == 1) {
            minutes = 'минуту';
        }else if((min % 10 > 1 && min % 10 < 5) && !(min > 11 && min < 15)) {
            minutes = 'минуты'
        }else{
            minutes = 'минут';
        }

        if(hh == 1) {
            hours = 'час';
        }else if((hh % 10 > 1 && hh % 10 < 5) && !(hh > 11 && hh < 15)) {
            hours = 'часа'
        }else{
            hours = 'часов';
        }

        return hh ? `${hh} ${hours} ${min} ${minutes}` : `${min} ${minutes}`
    }
     
    getTicket(num) {
        if(num == 1) {
            return 'билет';
        }else if((num % 10 > 1 && num % 10 < 5) && !(num > 11 && num < 15)) {
            return 'билета'
        }else{
            return 'билетов';
        }
    }

    getOut() {
        this.departureTime = this.calcMillisecondsToTime(this.timeOfDeparture[0]);
        this.timeOfArrival = this.calcMillisecondsToTime(this.timeOfDeparture[0] + this.timeOfTheRoad * 60 * 1000);

        let out = document.querySelector('.out');
        out.classList.remove('close');
        if(!this.number) {
            out.innerHTML = 'Укажите количество билетов';
        }else if(!this.timeOfDeparture[0]) {
            out.innerHTML = 'Укажите время';
        }else if(this.route === "из A в B и обратно в А" && (!this.timeOfDeparture[0] || !this.timeOfDeparture[1])) {
            out.innerHTML = 'Укажите время';
        }else{
            out.innerHTML = `
            <p>Вы выбрали ${this.number} ${this.getTicket(this.number)} по маршруту ${this.route} стоимостью ${this.equalPrice}р.</p>
            <p>Это путешествие займет у вас ${this.calcMinToTime(this.timeOfTheRoad)}.</p>
            <p>Теплоход отправляется в ${this.departureTime}, а прибудет в ${this.timeOfArrival}.</p>`;
        }
    }
}

let test = new Order();