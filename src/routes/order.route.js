import express from "express";

const path=require('path');
const express=require('express');
const orderRouter=express.Router();

const mapController=require('../controllers/map.controller.js');
const bookmarkController=require('../controllers/bookmark.controller.js');

orderRouter.get('/near/',mapController.);
