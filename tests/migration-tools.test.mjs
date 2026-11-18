import test from 'node:test';
import assert from 'node:assert/strict';
import {calendarDayDifference,documentExpiryResult,documentReadinessSummary,buildDocumentExpiryICS} from '../dist/modules/migration-tools.js';

test('document dates count calendar days across leap days and year boundaries without timezone hours',()=>{
 assert.equal(calendarDayDifference('2028-03-01','2028-02-28'),2);
 assert.equal(calendarDayDifference('2027-01-01','2026-12-31'),1);
 assert.equal(calendarDayDifference('2026-11-18','2026-11-18'),0);
 assert.equal(calendarDayDifference('2026-11-17','2026-11-18'),-1);
 assert.equal(calendarDayDifference('2026-02-29','2026-02-28'),null);
 assert.equal(calendarDayDifference('2026-04-31','2026-04-01'),null);
 assert.equal(calendarDayDifference('','2026-11-18'),null);
 assert.equal(calendarDayDifference('2026-11-20','invalid'),null);
});

test('expiry analysis separates passed, today and future dates and identifies past personal reminders',()=>{
 assert.deepEqual(documentExpiryResult('2027-01-05','30','2026-11-18'),{days:48,status:'upcoming',reminderDate:'2026-12-06',reminderDays:30,reminderInPast:false});
 assert.deepEqual(documentExpiryResult('2026-11-18','7','2026-11-18'),{days:0,status:'today',reminderDate:'2026-11-11',reminderDays:7,reminderInPast:true});
 assert.equal(documentExpiryResult('2026-11-17','14','2026-11-18').status,'expired');
 assert.equal(documentExpiryResult('2026-11-30','30','2026-11-18').reminderInPast,true);
 assert.equal(documentExpiryResult('2026-12-02','14','2026-11-18').reminderInPast,false);
 assert.equal(documentExpiryResult('2026-12-02','not-a-number','2026-11-18'),null);
 assert.equal(documentExpiryResult('2026-12-02','-7','2026-11-18'),null);
});

test('document review keeps packages separate and never treats missing or unknown answers as documents held',()=>{
 const items=[{id:'passport',required:true},{id:'form',required:true},{id:'consent',required:true},{id:'extra',required:false}];
 const answers={'rvp:passport':'have','rvp:form':'renew','rvp:consent':'missing','rvp:extra':'missing','pmzh:passport':'have','pmzh:form':'have'};
 const snapshot=JSON.stringify({items,answers});
 const rvp=documentReadinessSummary(items,answers,'rvp');
 assert.equal(rvp.requiredCount,3);assert.equal(rvp.have.length,1);assert.equal(rvp.renew.length,1);assert.equal(rvp.missing.length,1);assert.equal(rvp.hasUnresolved,true);
 const pmzh=documentReadinessSummary(items,answers,'pmzh');
 assert.equal(pmzh.have.length,2);assert.deepEqual(pmzh.uncertain.map(item=>item.id),['consent']);
 assert.equal(documentReadinessSummary(items,{'rvp:passport':'have','rvp:form':'have','rvp:consent':'have'},'rvp').hasUnresolved,false);
 assert.equal(documentReadinessSummary([],{},'unknown').hasUnresolved,true);
 assert.equal(JSON.stringify({items,answers}),snapshot);
});

test('calendar export uses the document date, selected reminder interval and next-day exclusive end',()=>{
 const ics=buildDocumentExpiryICS({date:'2027-01-05',remindDays:'30',today:'2026-11-18',documentLabel:'ВНЖ; учебный, пример',lang:'ru'});
 assert.ok(ics.includes('DTSTART;VALUE=DATE:20270105\r\n'));
 assert.ok(ics.includes('DTEND;VALUE=DATE:20270106\r\n'));
 assert.ok(ics.includes('TRIGGER:-P30D\r\n'));
 assert.ok(ics.replace(/\r\n /g,'').includes('ВНЖ\\; учебный\\, пример'));
 assert.ok(!ics.includes('TRIGGER:-P1D\r\n'));
 for(const line of ics.split('\r\n'))assert.ok(Buffer.byteLength(line)<=75);
 const late=buildDocumentExpiryICS({date:'2026-11-20',remindDays:'7',today:'2026-11-18',documentLabel:'Visa',lang:'en'});
 assert.ok(late.includes('BEGIN:VEVENT'));assert.ok(!late.includes('BEGIN:VALARM'));
 assert.equal(buildDocumentExpiryICS({date:'2026-11-17',remindDays:'7',today:'2026-11-18'}),null);
});
