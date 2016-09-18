 // BASE SETTINGS
 // ----------------------------------------
 
 //# Base settings
 var CURRENT_DATE 		= 	new Date();
 
 var TODAY 				= 	CURRENT_DATE.getDate(); 	
 var CURRENT_YEAR 		= 	CURRENT_DATE.getYear()+1900; 
 var CURRENT_MONTH 		= 	CURRENT_DATE.getMonth()+1;
 var CURRENT_TIME		= 	CURRENT_DATE.getHours() + ':' + CURRENT_DATE.getMinutes();
 var ROLE_WORKER 		= 	'worker';
 var ROLE_MANAGER 		= 	'manager';
 var ROLE_ORGANIZER 	= 	'organizer';
 
 var CELL_EVENT_INVITE	=	'date__invite';
 var CELL_EVENT_CONFIRM	=	'date__confirm';


//# Controls ID
 var CALENDAR_CONTAINER = 	'calendar';
 var PREV_MONTH			=	'prev-month';
 var NEXT_MONTH			=	'next-month';
 
 var BRANCH				= 	'branch';
 var USER_ROLE			=  	'user-role';
 
 var ADD_EVENT			=	'add-event';
 
 var MONTH				=	'calendar-month';
 var YEAR				=	'calendar-year';
 
 var EVENT				=	'event-in-cell';
 var OVERLAY			=	'b-overlay';
 var POPUP_WORKER		=	'b-popup-worker';
 var POPUP_MANAGER		=	'b-popup-manager';
 var POPUP_ORGANIZER	=	'b-popup-organizer';
 var POPUP_ADD_EVENT	=	'b-popup-add-event';
 
 var ADD_EVENT_BRANCH	=	'add-event-branch';
 var ADD_EVENT_TITLE	=	'add-event-title';
 var ADD_EVENT_DESC		=	'add-event-desc';
 
 var ADD_EVENT_DAY		=	'add-event-day';
 var ADD_EVENT_MONTH	=	'add-event-month';
 var ADD_EVENT_YEAR		=	'add-event-year';
 var ADD_EVENT_DATETIME	=	'add-event-datetime';
 var ADD_EVENT_SEATS	=	'add-event-seats';
 
 //# Default User Settings
 var CURRENT_ROLE 		= 	ROLE_WORKER;
 var CURRENT_BRANCH		=	'';
 var SELECTED_EVENT		=	'';
 var SELECTED_POPUP		= 	'';
 
 var SELECTED_POPUP_TITLE	=	'__event-desc .event-desc__title';
 var SELECTED_POPUP_DESC	=	'__event-desc .event-desc__description';
 
 var SELECTED_POPUP_DAY		=	'__event-info .event-info__day';
 var SELECTED_POPUP_MONTH	=	'__event-info .event-info__month';
 var SELECTED_POPUP_TIME	=	'__event-info .event-info__time-value';
 var SELECTED_POPUP_SEATS	=	'__event-info .event-info__count';
 var SELECTED_POPUP_CONFIRM =	'__confirm';
 var SELECTED_POPUP_CANCEL	= 	'__cancel';
 
 var MANAGER_NAME			=	'manager-name';
 var MANAGER_JOB			=	'manager-job';
 var MANAGER_EMAIL			=	'manager-email';

 var ORGANIZER_ADD_EVENT	=	false;
 
// ---------------------------------------- 
// FUNCTIONS
// ----------------------------------------

//# Function get month name
function GetMonthName(month){
	
	var NameOfMonth;
	
	switch(month) {
		case 1:
			NameOfMonth = 'январь';
			break;
	    case 2:
			NameOfMonth = 'февраль';
			break;
		case 3:
			NameOfMonth = 'март';
			break;
		case 4:
			NameOfMonth = 'апрель';
			break;
		case 5:
			NameOfMonth = 'май';
			break;
	    case 6:
			NameOfMonth = 'июнь';
			break;
		case 7:
			NameOfMonth = 'июль';
			break;
		case 8:
			NameOfMonth = 'август';
			break; 
		case 9:
			NameOfMonth = 'сентябрь';
			break;
	    case 10:
			NameOfMonth = 'октябрь';
			break;
		case 11:
			NameOfMonth = 'ноябрь';
			break;
		case 12:
			NameOfMonth = 'декабрь';
			break;        	    
	}
	
	return NameOfMonth;
	
}


//# Function get name of month
function RenderMonthYear(){
	
	var NameOfMonth = GetMonthName(CURRENT_MONTH);
	
	$('#' + MONTH).html(NameOfMonth);
	
	$('#' + YEAR).html(CURRENT_YEAR);
		
}

//# Function render Calendar
function RenderCalendar(){
	
	// Do calendar container empty
	$('#' + CALENDAR_CONTAINER).empty;
	
	RenderMonthYear();
	
	// Create new Calendar
	createCalendar(CALENDAR_CONTAINER, CURRENT_YEAR, CURRENT_MONTH);
	
}

//# Function load events
function LoadEvents(){
	
	RenderCalendar();
	
	for (i = 0; i < events.length; i++){
		
		if(events[i].branch == CURRENT_BRANCH){
			
			if (CURRENT_MONTH == events[i].date.month){
				
				var CalendarCell = $('#' + events[i].date.day);
				var EventTime  = events[i].time;
				var EventTitle = events[i].title;
				var Event = '<a class="event-in-cell" href="javascript:EventPopUp(' + i + ');">' + EventTime + ' ' + EventTitle + '</a>';
				
				CalendarCell.addClass(CELL_EVENT_INVITE);
				CalendarCell.append(Event);
				
			}
			
		}
		
	}
	
}

//# Function change branch
function ChangeBranch(){
	
	CURRENT_BRANCH = $('#' + BRANCH).val();
	
	LoadEvents();
		
}

//# function authentificate role
function Authentificate(){
	
	if(CURRENT_ROLE == ROLE_ORGANIZER){
		
		$('#' + ADD_EVENT).css("display", "block");
		
	}else{
		
		$('#' + ADD_EVENT).css("display", "none");
		
	}
	
}

//# Function change user role
function ChangeUserRole(){
	
	CURRENT_ROLE = $('#' + USER_ROLE).val();
	
	Authentificate();
	
}



//# Function render previcious month
function PrevMonth(){
	
	
	
	if (CURRENT_MONTH != 1){
		
		CURRENT_MONTH = CURRENT_MONTH - 1;
		
	}else{
		
		CURRENT_MONTH = 12;
		CURRENT_YEAR = CURRENT_YEAR - 1;
		
	}
	

	RenderCalendar();
	
	LoadEvents();
	
}

//# Function render next month
function NextMonth(){
	
	if (CURRENT_MONTH != 12){
		
		CURRENT_MONTH = CURRENT_MONTH + 1;
		
	}else{
		
		CURRENT_MONTH = 1;
		CURRENT_YEAR = CURRENT_YEAR + 1;
		
	}
	
	RenderCalendar();
	
	LoadEvents();
	
}

//# Function change popup

function SelectPopUp(){
	
	switch(CURRENT_ROLE) {
		case 'worker':
			SELECTED_POPUP = POPUP_WORKER;
			break;
	    case 'manager':
			SELECTED_POPUP = POPUP_MANAGER;
			break;
		case 'organizer':
			
			if (ORGANIZER_ADD_EVENT){
				SELECTED_POPUP = POPUP_ADD_EVENT;
			}else{
				SELECTED_POPUP = POPUP_ORGANIZER;
			}
			break;
       	    
	}
	
	$('.' + SELECTED_POPUP).css("display", "block");
	
}

//# Function show overlay
function ShowPopUp(){
	
	$('.' + OVERLAY).css("display", "block");
	


}

//# Function render submit button
function RenderSubmitButton(EventReg){
	
	
	
	switch(EventReg) {
		case false:
			$('.' + SELECTED_POPUP + SELECTED_POPUP_CONFIRM).css("display", "block");
			$('.' + SELECTED_POPUP + SELECTED_POPUP_CANCEL).css("display", "none");
			break;
		case true:
			$('.' + SELECTED_POPUP + SELECTED_POPUP_CONFIRM).css("display", "none");
			$('.' + SELECTED_POPUP + SELECTED_POPUP_CANCEL).css("display", "block");
			break;
	}
	
}

//# Function get event info
function GetEventInfo(){
	
	var EventTitle 	= events[SELECTED_EVENT].title;
	var EventDesc	= events[SELECTED_EVENT].description;
	var EventDay	= events[SELECTED_EVENT].date.day;
	var EventMonth	= GetMonthName(events[SELECTED_EVENT].date.month);
	var EventTime	= events[SELECTED_EVENT].time;
	var EventSeats	= events[SELECTED_EVENT].seats;
	
	switch(CURRENT_ROLE) {
		case 'worker':
			var EventReg	= events[SELECTED_EVENT].register.worker;
			break;
		case 'manager':
			var EventReg	= events[SELECTED_EVENT].register.manager;
			break;
	}
	
	
	
	$('.' + SELECTED_POPUP + SELECTED_POPUP_TITLE).html(EventTitle);
	$('.' + SELECTED_POPUP + SELECTED_POPUP_DESC).html(EventDesc);
	$('.' + SELECTED_POPUP + SELECTED_POPUP_DAY).html(EventDay);
	$('.' + SELECTED_POPUP + SELECTED_POPUP_MONTH).html(EventMonth);
	$('.' + SELECTED_POPUP + SELECTED_POPUP_TIME).html(EventTime);
	$('.' + SELECTED_POPUP + SELECTED_POPUP_SEATS).html(EventSeats);
	
	RenderSubmitButton(EventReg);
	
}

//# Function get event information
function EventPopUp(i){
	
	SELECTED_EVENT = i;
	
	SelectPopUp();
	
	ShowPopUp();
	
	GetEventInfo();
	
}

//# Function register
function EventRegister(){
	
	switch(CURRENT_ROLE) {
		case 'worker':
			events[SELECTED_EVENT].register.worker = true;
			RenderSubmitButton(events[SELECTED_EVENT].register.worker);
			break;
	    case 'manager':
			events[SELECTED_EVENT].register.manager = true;
			RenderSubmitButton(events[SELECTED_EVENT].register.manager);
			break;
       	    
	}
	
	
}

//# Function cancel register
function EventUnregister(){
	
	switch(CURRENT_ROLE) {
		case 'worker':
			events[SELECTED_EVENT].register.worker = false;
			RenderSubmitButton(events[SELECTED_EVENT].register.worker);
			break;
	    case 'manager':
			events[SELECTED_EVENT].register.manager = false;
			RenderSubmitButton(events[SELECTED_EVENT].register.manager);
			break;
       	    
	}
	
}


//# Function close current popup
function ClosePopUp(){
	
	$('.' + SELECTED_POPUP).css("display", "none");
	
	$('.' + OVERLAY).css("display", "none");
	
	ClearFields();
	
	ORGANIZER_ADD_EVENT = false;
	
}

//# Function delete event
function DeleteEvent(){
	
	events.splice(SELECTED_EVENT, 1);
	
	RenderCalendar();
	
	LoadEvents();
	
	ClosePopUp();
}

//# Function Month to Word
function AddEventChangeMonth(){
	
	var MonthSelect = $('#' + ADD_EVENT_MONTH).val();
	console.log(MonthSelect);
	
	var MonthWord = GetMonthName(parseInt(MonthSelect, 10));
	console.log(MonthWord);
	
	$('#' + ADD_EVENT_MONTH + '-fake').html(MonthWord);
	
}

//# Function get default values
function GetDefaultValues(){
	
	$('#' + ADD_EVENT_DAY).val(TODAY);
	
	$('#' + ADD_EVENT_MONTH).val(CURRENT_MONTH);
	AddEventChangeMonth();
	
	$('#' + ADD_EVENT_YEAR).val(CURRENT_YEAR);
	$('#' + ADD_EVENT_DATETIME).val(CURRENT_TIME);
	
	$('#' + ADD_EVENT_SEATS).val(25);
	
}

//# Function Clear Fields
function ClearFields(){
	
	switch(CURRENT_ROLE) {
		case ROLE_WORKER:
			break;
	    case ROLE_MANAGER:
			$('#' + MANAGER_NAME).val('');
			$('#' + MANAGER_JOB).val('');
			$('#' + MANAGER_EMAIL).val('');
			break;
		case ROLE_ORGANIZER:
			$('#' + ADD_EVENT_TITLE).val('');
			$('#' + ADD_EVENT_DESC).val('');
			
			GetDefaultValues();
			break;   
	}
	
}

//# Function add event
function AddEvent(){
	
	var EventTitle 	= $('#' + ADD_EVENT_TITLE).val();
	var EventDesc 	= $('#' + ADD_EVENT_DESC).val();
	
	var EventDay 	= $('#' + ADD_EVENT_DAY).val();
	var EventMonth 	= $('#' + ADD_EVENT_MONTH).val();
	var EventYear 	= $('#' + ADD_EVENT_YEAR).val();
	
	var EventTime 	= $('#' + ADD_EVENT_DATETIME).val();
	var EventSeats 	= $('#' + ADD_EVENT_SEATS).val();
	
	var EventBranch = $('#' + ADD_EVENT_BRANCH).val();
	
	var NewEvent = {
						title: 			EventTitle,
						description: 	EventDesc,
						seats:			EventSeats,
						branch:			EventBranch,
						date:			{
											day: 	EventDay,
											month: 	EventMonth,
											year: 	EventYear
										},
						time:			EventTime,
						register:		{
											worker: 	false,
											manager:	false	
										}
					};
					
	events.push(NewEvent);
	
	RenderCalendar();
	
	LoadEvents();
	
	ClosePopUp();
	
}

// ----------------------------------------
// TEST DATABASE
// ----------------------------------------

var events = [
		{
			title: 			'Технологии продаж для бизнеса 2017 года',
			description: 	'Как заключать миллиардные контракты через личные встречи, какая структура отдела продаж максимально эффективна в управлении.',
			seats:			25,
			branch:			'moscow',
			date:			{
								day: 	9,
								month: 	8,
								year: 	2016
							},
			time:			'18:00',
			register:		{
								worker: 	false,
								manager:	false	
							}
		},
		{
			title: 			'Реклама в Инстаграм',
			description: 	'Как заключать миллиардные контракты через личные встречи, какая структура отдела продаж максимально эффективна в управлении.',
			seats:			25,
			branch:			'moscow',
			date:			{
								day: 	12,
								month: 	8,
								year: 	2016
							},
			time:			'18:00',
			register:		{
								worker: 	false,
								manager:	false	
							}
		},
		{
			title: 			'Как развивать свой бизнес',
			description: 	'Как заключать миллиардные контракты через личные встречи, какая структура отдела продаж максимально эффективна в управлении.',
			seats:			25,
			branch:			'saint-p',
			date:			{
								day: 	8,
								month: 	8,
								year: 	2016
							},
			time:			'18:00',
			register:		{
								worker: 	false,
								manager:	false	
							}
		},
		{
			title: 			'5 новых технологий маркетинга',
			description: 	'Как заключать миллиардные контракты через личные встречи, какая структура отдела продаж максимально эффективна в управлении.',
			seats:			25,
			branch:			'saint-p',
			date:			{
								day: 	17,
								month: 	8,
								year: 	2016
							},
			time:			'18:00',
			register:		{
								worker: 	false,
								manager:	false	
							}
		}	
];


// ----------------------------------------
// DOCUMENT READY
// ----------------------------------------

$(document).ready ( function(){
 	
 	RenderCalendar();
 	
 	Authentificate();
 	
 	$('#' + PREV_MONTH).click(function(){

	 	PrevMonth();
	 	
 	});
 	
 	$('#' + NEXT_MONTH).click(function(){
	 	
	 	NextMonth();
	 	
 	});
 	
 	$('#' + BRANCH).change(function(){
	 	
	 	ChangeBranch();
	 	
 	});
 	
 	$('#' + USER_ROLE).change(function(){
	 	
	 	ChangeUserRole();
	 	
 	});
 	
 	$('#' + ADD_EVENT).click(function(){
	 	
	 	ORGANIZER_ADD_EVENT = true;
	 	
	 	SelectPopUp();
	 	
	 	ShowPopUp();
	 	
	 	GetDefaultValues();
	 	
 	});
 	
 	$('#' + ADD_EVENT_MONTH).change(function(){
	 	
	 	AddEventChangeMonth();
	 	
 	});
  
});