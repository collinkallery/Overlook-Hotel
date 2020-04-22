# Overlook Hotel - Mod 2 Final Solo Project 

## Project Overview & Objectives

OVERLOOK was a final solo project assigned at the end of our second quarter at Turing School of Software and Design. The overarching goal was to create a hotel website designed for two different users: a customer, and a manager. The customer should be able to log on, select a date for their upcoming trip, see rooms available on that date, book that room, review their financial history with OVERLOOK, and view any details from previous trips. A manager should be able to log on, and similarly, create a booking for any of the members, delete bookings, manage the day's reservations, and review up-to-date revenue and sales. 

### Specific Objectives
- Utilize an API holding desired data by implementing fetch, post, and delete
- Implement the SOLID principles of Object Oriented Programming
- Use SCSS to organize and DRY up stylings 
- Make use of jQuery in place of Vanilla JS 
- Use ES6 syntax as often as possible 
- Robust testing suites for all classes, implementing SPIES where necessary to ensure proper DOM invocations

## Challenges & Looking Ahead
- Throughout the buildout of this project, there were quite a few roadblocks in the way. Being newly oriented to working with APIs, accessing our data from a server proved to be quite difficult, but was able to successfully retrieve the data and display it accordinly on the DOM. Additionally, overall class structure and decoupling throughout the process was a decent challenge. 
- Looking ahead, there are quite a few things I would still like to address or modify. The first being one of the classes (manager.js) - I went back and forth between wanting to implement inhereitance from the user class, but eventually decided not to. As a result, the manager class laying relatively dormant. My accessibility for the site was quite low as well, reaching a score of 70 and lacking ARIA label tags due to time. Lastly, there appears to be some strange behavior in terms of refreshing the website upon POST requests, so this is something I would like to dig more into. 

## OVERLOOK in Action
![Login page](https://i.imgur.com/sfxe0An.png)
![Manager page](https://i.imgur.com/IEL6JGc.jpg)
![Customer page](https://i.imgur.com/UqA4dgt.jpg)
