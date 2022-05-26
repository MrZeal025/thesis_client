"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisitationHistroyCOLUMNS = exports.CloseContactCOLUMNS = exports.RolesAndPermissionsCOLUMNS = exports.UsersCOLUMN = exports.AdminsCOLUMN = exports.LocationsCOLUMN = exports.PositiveLogsCOLUMN = exports.LogsCOLUMN = void 0;
var LogsCOLUMN = [{
  Header: 'No.',
  accessor: 'no'
}, {
  Header: 'Users Contact No.',
  accessor: ''
}, {
  Header: 'Location',
  accessor: 'location'
}, {
  Header: 'Action',
  accessor: ''
}, {
  Header: 'Date',
  accessor: 'date'
}, {
  Header: 'Time',
  accessor: ''
}];
exports.LogsCOLUMN = LogsCOLUMN;
var PositiveLogsCOLUMN = [{
  Header: 'No.',
  accessor: 'no'
}, {
  Header: 'Name',
  accessor: ''
}, {
  Header: 'Contact Number',
  accessor: 'mobileNumber'
}, {
  Header: 'Affiliation',
  accessor: 'userType'
}, {
  Header: 'Current Status',
  accessor: 'healthStatus'
}, {
  Header: 'Date',
  accessor: 'date'
}, {
  Header: 'Actions',
  accessor: ''
}];
exports.PositiveLogsCOLUMN = PositiveLogsCOLUMN;
var LocationsCOLUMN = [{
  Header: 'No.',
  accessor: 'no'
}, {
  Header: 'Location Name',
  accessor: 'name'
}, {
  Header: 'Location Address',
  accessor: 'address'
}, {
  Header: 'Officer in Charge',
  accessor: 'officerInCharge'
}, {
  Header: 'Date Created',
  accessor: 'dateCreated'
}, {
  Header: 'Actions',
  accessor: 'none'
}];
exports.LocationsCOLUMN = LocationsCOLUMN;
var AdminsCOLUMN = [{
  Header: 'No.',
  accessor: ''
}, {
  Header: 'Username',
  accessor: 'username'
}, {
  Header: 'Faculty Name',
  accessor: ''
}, {
  Header: 'Email',
  accessor: 'email'
}, {
  Header: 'Role',
  accessor: 'role'
}, {
  Header: 'Location Assigned',
  accessor: 'locationAssigned'
}, {
  Header: 'Actions',
  accessor: 'none'
}];
exports.AdminsCOLUMN = AdminsCOLUMN;
var UsersCOLUMN = [{
  Header: 'No.',
  accessor: ''
}, {
  Header: 'Contact Number',
  accessor: 'mobileNumber'
}, {
  Header: 'Type',
  accessor: 'userType'
}, {
  Header: 'Health Status',
  accessor: 'userHealthStatus'
}, {
  Header: 'Registration Date',
  accessor: ''
}];
exports.UsersCOLUMN = UsersCOLUMN;
var RolesAndPermissionsCOLUMNS = [{
  Header: 'No.',
  accessor: ''
}, {
  Header: 'Role Name',
  accessor: 'name'
}, {
  Header: 'Description',
  accessor: 'description'
}, {
  Header: 'Permissions',
  accessor: ''
}, {
  Header: 'Actions',
  accessor: 'none'
}];
exports.RolesAndPermissionsCOLUMNS = RolesAndPermissionsCOLUMNS;
var CloseContactCOLUMNS = [{
  Header: 'No.',
  accessor: ''
}, {
  Header: 'Close Contact Number',
  accessor: ''
}, {
  Header: 'Location',
  accessor: 'location'
}, {
  Header: 'Action',
  accessor: 'action'
}, {
  Header: 'Date',
  accessor: ''
}, {
  Header: 'Time',
  accessor: 'none'
}];
exports.CloseContactCOLUMNS = CloseContactCOLUMNS;
var VisitationHistroyCOLUMNS = [{
  Header: 'No.',
  accessor: ''
}, {
  Header: 'Location',
  accessor: 'location'
}, {
  Header: 'Action',
  accessor: 'action'
}, {
  Header: 'Date',
  accessor: ''
}, {
  Header: 'Time',
  accessor: 'none'
}];
exports.VisitationHistroyCOLUMNS = VisitationHistroyCOLUMNS;