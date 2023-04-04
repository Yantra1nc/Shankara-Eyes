/**
 *@NApiVersion 2.x
 *@NScriptType UserEventScript
 */
 define(['N/currentRecord', 'N/search','N/record','N/log', 'N/url', 'N/ui/serverWidget','N/email','N/runtime','N/file', 'N/render'],

 function(currentRecord,search,record,log,url, serverWidget, email,runtime,file,render){
 
 function afterSubmit(context) {
       log.debug("entered");
       var mode = context.type;
       log.debug('beforeLoad','mode=='+mode);
       //if(mode=='edit' || mode=='create')
		   if (context.type == context.UserEventType.CREATE || context.type == context.UserEventType.EDIT)
       {
       var currentRecord = context.newRecord;
var recordId = context.newRecord.id;
log.debug('beforeLoad','recordId=='+recordId);

var record_Type = context.newRecord.type;
log.debug('beforeLoad','finalXMLValuerecordType=='+record_Type);





var userID = runtime.getCurrentUser().id;
                    log.debug('Internal ID of current user: ', userID);

var record_load = record.load({

type:record_Type,
id:recordId,
isDynamic:true
});
log.debug("record_load",record_load);


//var file = render.xmlToPdf({xmlString:});

/*var file_id;
var purchaseorderSearchObj = search.create({
   type: "transaction",
   filters:
   [
      ["type","anyof",record_Type],
      "AND",
      ["internalid","anyof",recordId],
      "AND",


/*
purchaseorderSearchObj.id="customsearch1666256432370";
purchaseorderSearchObj.title="file  Search (copy)";
var newSearchId = purchaseorderSearchObj.save();
*/

var vendor_id = record_load.getValue('entity');
       log.debug('vendor_id', vendor_id);

//record_load
var vendor_load = record.load({

type:'vendor',
id:vendor_id,
isDynamic:true
});

log.debug('vendor_load', vendor_load);

//Main Vendor email
var vendor_email=vendor_load.getValue('email');
log.debug('vendor_email',vendor_email);

//cc emails


var ccArr= [];

var vendor_email_1=vendor_load.getValue('custentity_seh_email_1_');
log.debug('vendor_email_1',vendor_email_1);
if(_logValidation(vendor_email_1)){
ccArr.push(vendor_email_1);
}

var vendor_email_2=vendor_load.getValue('custentity_seh_email_2_');
log.debug('vendor_email_2',vendor_email_2);
if(_logValidation(vendor_email_2)){
ccArr.push(vendor_email_2);
}

var vendor_email_3=vendor_load.getValue('custentity_seh_email_3_');
log.debug('vendor_email_3',vendor_email_3);
if(_logValidation(vendor_email_3)){
ccArr.push(vendor_email_3);
}

log.debug("ccArr",ccArr);

if(_logValidation(vendor_email)){


if(record_Type == 'purchaseorder'){


var approval_status_po = record_load.getValue('approvalstatus');
log.debug('afterSubmit','finalXMLValueofapprovalstatus=='+approval_status_po);
var check=record_load.getValue({fieldId:'custbody_seh_emai_sent_'});
						log.debug("check",check);

if(_logValidation(approval_status_po) ){

if(approval_status_po == "2")
{
	
	if(check == false){
	
var tranid = record_load.getValue('tranid');
       log.debug('tranid', tranid);

var transactionFile = render.transaction({
entityId: recordId,
printMode: render.PrintMode.PDF,
//inCustLocale: true
});

log.debug("transactionFile",transactionFile);



var emailbody= '<html><email><body><p style="font-size:16px;">Dear Sir/Ma’am,<br><br> Greetings of the day!! <br><br> Please find the attached purchase order from Sankara Eye Hospital.<br> We are pleased to release the order based on the quotes submitted / negotiations held. <br><br> Please observe the following while executing the Purchase order: <br><br> 1. Our PO and GST No must be mentioned in your invoice. <br><br> 2. Kindly acknowledge the receipt of Purchase order and furnish us with the order execution details. <br><br> 3. Request to attach the PO copy along with invoice. <br><br> Thanks and Regards, <br><br> Procurement Team <br> Sankara Eye Hospitals</p><p style="font-size:12px;">Disclaimer: IMPORTANT NOTICE: This e-mail message is intended to be received only by persons entitled to receive the confidential information it may contain. E-mail messages to clients of Sri Kanchi Kamakoti Medical Trust / Sankara Eye Hospital. may contain information that is confidential and legally privileged. Please do not read, copy, forward, or store this message unless you are an intended recipient of it. If you have received this message in error, please forward it to the sender and delete it completely from your computer system.</p></body></email></html>';
if(_logValidation(ccArr)){
                email.send({
                        author:userID,
                        recipients: vendor_email,
cc: ccArr,
                        subject: tranid,
                        body: emailbody,
                        attachments: [transactionFile],
                        relatedRecords: null
                        });
						var check_set=record_load.setValue({fieldId:'custbody_seh_emai_sent_', value:true,
						ignoreFieldChange: true});
						log.debug("check_set",check_set);
						
						var id = record.submitFields({
                type: record_Type,
                id: recordId,
                values: {
                    'custbody_seh_emai_sent_': true,
                },
                options: {
                    enableSourcing: false,
                    ignoreMandatoryFields : true
                }
            });
						
}
else
{
email.send({
                        author:userID,
                        recipients: vendor_email,
                        subject: tranid,
                        body: emailbody,
                        attachments: [transactionFile],
                        relatedRecords: null
                        });
						var check_set=record_load.setValue({fieldId:'custbody_seh_emai_sent_', value:true ,
						ignoreFieldChange: true});
						log.debug("check_set",check_set);
						
												var id = record.submitFields({
                type: record_Type,
                id: recordId,
                values: {
                    'custbody_seh_emai_sent_': true,
                },
                options: {
                    enableSourcing: false,
                    ignoreMandatoryFields : true
                }
            });
						

}
	}
}
}
}

if(record_Type == 'vendorpayment'){




/*var transactionFile = render.transaction({
entityId: recordId,
printMode: render.PrintMode.PDF,
//inCustLocale: true
});

log.debug("transactionFile",transactionFile);*/

/*var fileObj = file.load({
id:'109'
});
log.debug("vendor pdf only",fileObj);*/

  var renderer = render.create();
                    renderer.setTemplateById(110);
                    renderer.addRecord({
                        templateName: 'record',
                        record: record.load({
                            type: record.Type.VENDOR_PAYMENT,
                            id: context.newRecord.id
                        })
                    });
                    var pdfObj = renderer.renderAsPdf();
log.debug("pdfObj",pdfObj);



var emailbody= '<html><email><body><p style="font-size:16px;">Dear Sir/Ma’am,<br><br> Greetings of the day!! <br><br>Please find attached the details of Payment Advice from M/s.SKKMT towards your pending bills <br><br> Thanks and Regards, <br><br> Procurement Team <br> Sankara Eye Hospitals</p></body></email></html>';
if(_logValidation(ccArr)){
log.debug("with cc if block");
                email.send({
                        author:userID,
                        recipients: vendor_email,
cc: ccArr,
                        subject: 'with cc Test',
                        body: emailbody,
                        attachments: [pdfObj],
                        relatedRecords: null
                        });
}
else
{
log.debug("withou cc else block");
email.send({
                        author:userID,
                        recipients: vendor_email,
                        subject: 'without cc Test',
                        body: emailbody,
                        attachments: [pdfObj],
                        relatedRecords: null
                        });

}
}

/*if(record_Type == 'vendorbill'){


var vb_transaction_number=context.newRecord.getValue('transactionnumber');
log.debug('vb_transaction_number',vb_transaction_number);


var vb_bill_date=context.newRecord.getValue('trandate');
log.debug('vb_bill_date',vb_bill_date);


var vb_vendor_amount=context.newRecord.getValue('usertotal');
log.debug('vb_vendor_amount',vb_vendor_amount);

if(_logValidation(ccArr)){
var emailbody= '<html><email><body><p style="font-size:16px;">Dear Sir/Ma’am,<br><br> Greetings of the day!! <br><br>Please find the details of Vendor bill from M/s.SKKMT<br><br> Vendor Transaction Number-' +vb_transaction_number+ '<br> Vendor Bill Date-' +vb_bill_date+' <br>Vendor Amount-' +vb_vendor_amount+ '<br><br>Thanks and Regards, <br><br> Procurement Team <br> Sankara Eye Hospitals</p></body></email></html>';
email.send({
                        author: 50542,
                        recipients: vendor_email,
cc: ccArr,
                        subject: 'Vendor bill Test',
                        body: emailbody,
                        attachments: null,
                        relatedRecords: null
                        });
}
else
{
var emailbody= 'Vendor bill with transaction number ' +vb_transaction_number+ 'has been created';
email.send({
                        author: 50542,
                        recipients: vendor_email,
                        subject: 'Vendor bill Test',
                        body: emailbody,
                        attachments: null,
                        relatedRecords: null
                        });

}

}*/
}
}
}
function _logValidation(value) {
            if (value != 'null' && value != null && value != null && value != '' && value != undefined && value != undefined && value != 'undefined' && value != 'undefined' && value != 'NaN' && value != NaN && value != 'Infinity') {
                return true;
            } else {
                return false;
            }
        }
 return {
       afterSubmit:afterSubmit
   }

});