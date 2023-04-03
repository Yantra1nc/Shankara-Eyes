/**
 *@NApiVersion 2.x
 *@NScriptType ClientScript
 **/
define(['N/record', 'N/search', 'N/ui/dialog', 'N/log'], function(record, search, dialog, log) {

    function fieldChanged(context) {
        try {
            var currentRecord = context.currentRecord;
            var currentRecord_type = currentRecord.type;
            var fieldName = context.fieldId;
            if (fieldName == "purchaseorder") {
                var payment_value = currentRecord.getValue({
                    fieldId: 'payment'
                });
                log.debug("fieldChanged=> payment_value ", payment_value);

                var PO_ref = currentRecord.getValue({
                    fieldId: 'purchaseorder'
                });

                if (_logValidation(PO_ref)) {
                    var fieldLookUp = search.lookupFields({
                        type: 'purchaseorder',
                        id: PO_ref,
                        columns: ['total']
                    });
                    log.debug("pageInit=>fieldLookUp", JSON.stringify(fieldLookUp));

                    var total_amt = fieldLookUp.total;
                    var isCount = searchTotalPoAmount(PO_ref)
                    log.debug('isCount', isCount)
                    if (_logValidation(isCount) && Math.abs(isCount) >= total_amt) {
                        alert("You can not select this po to create pre payment record")
                        currentRecord.setValue({
                            fieldId: 'purchaseorder',
                            value: null
                        })
                        return;
                    }

                    log.debug("pageInit=>total_amt", total_amt);
                    var paid_amount = searchTotalPoAmount(PO_ref);
                    log.debug('paid_amount in field changed', paid_amount)
                    if (!_logValidation(paid_amount)) {
                        paid_amount = 0
                    }

                    var remaining_vpp_amt = Number(total_amt) - Math.abs(Number(paid_amount));
                    log.debug("fieldChanged=>remaining_vpp_amt", remaining_vpp_amt);

                    currentRecord.setValue({
                        fieldId: 'custbody_seh_total_paid_amt_',
                        value: parseFloat(paid_amount).toFixed(2)
                    });
                    //currentRecord.setValue({fieldId:'custbody_seh_total_paid_amt_', value:78});
                    if (remaining_vpp_amt > 0) {
                        currentRecord.setValue({
                            fieldId: 'payment',
                            value: parseFloat(remaining_vpp_amt).toFixed(2)
                        });
                    }
                    //currentRecord.setValue({fieldId:'payment', value:1111});
                    currentRecord.setValue({
                        fieldId: 'custbody_po_total_amt_',
                        value: parseFloat(total_amt).toFixed(2)
                    });
                    currentRecord.setValue({
                        fieldId: 'custbody3',
                        value: parseFloat(remaining_vpp_amt).toFixed(2)
                    });
                }
            }

        } catch (e) {
            log.error("error", e);
        }
    }

    function postSourcing(context) {
        var currentRecord = context.currentRecord;

        var isValuePresent = currentRecord.getValue({
            fieldId: 'custbody3'
        });
        if (_logValidation(isValuePresent)) {

            currentRecord.setValue({
                fieldId: 'payment',
                value: isValuePresent
            });
        }


    }


    function saveRecord(context) {
        try {

            var currentRecord = context.currentRecord;
            var recID = currentRecord.id;
            var payment_value = currentRecord.getValue({
                fieldId: 'payment'
            });
            var PO_ref = currentRecord.getValue({
                fieldId: 'purchaseorder'
            });
            var remain_amt = currentRecord.getValue({
                fieldId: 'custbody3'
            });
            log.debug("saveRecord => remain_amt ", remain_amt);
            if (!_logValidation(remain_amt)) {
                remain_amt = 0
            }
            if (_logValidation(PO_ref)) {
                var isCount = searchPOStatus(PO_ref)
                log.debug('isCount', isCount)
                var i_flag = false
                if (_logValidation(isCount) && isCount > 0) {
                    var i_message = "You can not select this po to create pre payment record"
                    i_flag = true
                }
                if (parseFloat(payment_value) > parseFloat(remain_amt)) {
                    //alert("you can not enter prepayment value more than" + remain_amt);
                    // return false;
                    var i_message = "you can not enter prepayment value more than" + remain_amt
                    i_flag = true
                }
                if (i_flag) {
                    alert("Note-" + i_message)
                    return false
                } else {
                    return true
                }
            } else {
                return true
            }
            //return true;

        } catch (e) {
            log.error("error in save record function", e.message)
        }
    }

    function pageInit(context) {
        try {
            var rec = context.currentRecord;

            var fieldId = 'payment';
            log.debug('context.mode', context.mode)
            //if(context.mode=='create')
            {

                var PO_ref = rec.getValue('purchaseorder');
                //alert("PO_ref" + PO_ref);
                if (_logValidation(PO_ref)) {
                    var fieldLookUp = search.lookupFields({
                        type: 'purchaseorder',
                        id: PO_ref,
                        columns: ['total','location','department','class','custbody_sankara_approval_code','cseg_sankara_track']
                    });
                    log.debug("pageInit=>fieldLookUp", JSON.stringify(fieldLookUp));

                    var total_amt = fieldLookUp.total;
					
                    log.debug("pageInit=>total_amt", total_amt);
                    var payment_value = rec.getValue('payment');
                    var remain_amt = rec.getValue('custbody3');
                    var paid_amount = searchTotalPoAmount(PO_ref);
                    log.debug('paid_amount', paid_amount)
                    if (!_logValidation(paid_amount)) {
                        paid_amount = 0
                    }
                    var remaining_vpp_amt = parseFloat(parseFloat(total_amt) - Math.abs(parseFloat(paid_amount)).toFixed(2));
                    log.debug("pageInit=>remaining_vpp_amt", remaining_vpp_amt);

                    rec.setValue('custbody_seh_total_paid_amt_', parseFloat(paid_amount).toFixed(2));
                    if (context.mode == 'create' && remaining_vpp_amt > 0) {
                        rec.setValue('payment', parseFloat(remaining_vpp_amt).toFixed(2));
                    }
                    rec.setValue('custbody_po_total_amt_', parseFloat(total_amt).toFixed(2));
                    rec.setValue('custbody3', parseFloat(remaining_vpp_amt).toFixed(2));
					/*************Added by sanjit*************/
					var i_class  =fieldLookUp.class
					var i_department = fieldLookUp.department
					var i_apprCode= fieldLookUp.custbody_sankara_approval_code
					var i_location = fieldLookUp.location
					var i_track = fieldLookUp.cseg_sankara_track
					if(i_class.length>0){
						 rec.setValue('class', Number(i_class[0].value));
					}
					if(i_department.length>0){
						rec.setValue('department', Number(i_department[0].value));
					}
					if(i_apprCode.length>0){
						rec.setValue('custbody_sankara_approval_code', Number(i_apprCode[0].value));
					}
					if(i_location.length>0){
						 rec.setValue('location', Number(i_location[0].value));
					}
					if(i_track.length>0){
						 rec.setValue('cseg_sankara_track', Number(i_track[0].value));
					}
					/*************END************************/
                }
            }
        } catch (e) {
            log.error("error in pageinit function", e.message);
        }

    }

    function _logValidation(value) {
        if (value != 'null' && value != null && value != null && value != '' && value != undefined && value != undefined && value != 'undefined' && value != 'undefined' && value != 'NaN' && value != NaN && value != 'Infinity') {
            return true;
        } else {
            return false;
        }
    }

    // pass the po id
    function searchTotalPoAmount(PO_ref) {
        try {
            var i_poAmt = 0
            var purchaseorderSearchObj = search.create({
                type: "purchaseorder",
                filters: [
                    ["type", "anyof", "PurchOrd"],
                    "AND",
                    ["applyingtransaction.type", "anyof", "VPrep"],
                    "AND",
                    ["applyingtransaction.status", "anyof", "VPrep:B"],
                    "AND",
                    ["internalid", "anyof", PO_ref]
                ],
                columns: [
                    search.createColumn({
                        name: "transactionnumber",
                        summary: "GROUP",
                        label: "Transaction Number"
                    }),
                    search.createColumn({
                        name: "amount",
                        join: "applyingTransaction",
                        summary: "SUM",
                        label: "Amount"
                    })
                ]
            });
            var searchResultCount = purchaseorderSearchObj.runPaged().count;
            log.debug("purchaseorderSearchObj result count", searchResultCount);
            purchaseorderSearchObj.run().each(function(result) {
                i_poAmt = result.getValue({
                    name: "amount",
                    join: "applyingTransaction",
                    summary: "SUM",
                    label: "Amount"
                });

                log.debug("pageInit=>paid_amount", i_poAmt);
                return true;
            });
            return i_poAmt

        } catch (e) {
            log.error('error in search searchTotalPoAmount function ', e.message)
            return null
        }
    }

    function searchPOStatus(PO_ref) {
        try {
            var purchaseorderSearchObj = search.create({
                type: "purchaseorder",
                filters: [
                    ["type", "anyof", "PurchOrd"],
                    "AND",
                    ["mainline", "is", "T"],
                    "AND",
                    ["internalid", "anyof", PO_ref],
                    "AND",
                    ["status", "anyof", "PurchOrd:G"]
                ],
                columns: [
                    search.createColumn({
                        name: "internalid",
                        label: "Internal ID"
                    })
                ]
            });
            var searchResultCount = purchaseorderSearchObj.runPaged().count;
            return searchResultCount
        } catch (e) {
            log.error('error in searchPOStatus function', e.message)
            return null
        }
    }
    return {

        fieldChanged: fieldChanged,
        pageInit: pageInit,
        //validateField : validateField
        saveRecord: saveRecord,
        postSourcing: postSourcing
    }

});