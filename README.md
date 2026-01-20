# Contract Management Platform 

# Overview

This project is a frontend-only Contract Management Platform built using React JS.
It allows users to create reusable contract blueprints, generate contracts from those blueprints, fill contract field values, and manage contracts through a controlled lifecycle using a dashboard interface.

The application focuses on clean architecture, state management, and logical UX flow, without using a backend.

# Setup Instructions
Prerequisites

Node.js (v16 or later recommended)
npm or yarn

Steps to Run the Project

->Install dependencies

npm install

->Start the development server

npm start


The application will run at:
👉 http://localhost:3000


# Architecture and Design Decisions
1. Component-Based Architecture

The application is structured using modular React components to ensure separation of concerns:

BlueprintBuilder – creates reusable contract templates

ContractForm – generates contracts from selected blueprints

ContractDetail – allows users to fill field values

ContractTable (Dashboard) – displays and manages contracts

ContractContext – centralized state management

This structure improves readability, maintainability, and scalability.

2. State Management (Context API + useReducer)

Global state is managed using React Context API with useReducer.

Why this approach?

No backend is required

Predictable and controlled state updates

Easy handling of contract lifecycle transitions

Avoids prop drilling

State includes:

Blueprints

Contracts

Selected contract

Contract lifecycle status

Contract field values

3. Contract Lifecycle Design

Each contract follows a strict lifecycle:

CREATED → APPROVED → SENT → SIGNED → LOCKED
(REVOKED allowed before LOCKED)


Lifecycle rules:

Users cannot skip steps

Locked contracts cannot be edited

Revoked contracts cannot proceed further

Lifecycle actions are handled centrally via reducer logic to ensure consistency.

4. Contract Creation and Field Inheritance

Contracts are generated from selected blueprints

All blueprint fields are copied into the contract

Each field includes a value property for user input

Blueprints remain reusable and unchanged

Users must fill all contract fields before lifecycle actions are enabled.

5. Dashboard Design

The dashboard displays contracts in a table view, grouped and filterable by status:

Pending – Created, Approved, Sent

Active – Signed

Signed – Locked

Each row displays:

Contract name

Blueprint name

Grouped status

Created date

Action buttons (approve, send, sign, lock, revoke)

This provides a clear overview of contract progress.

# Assumptions and Limitations
->Assumptions

This is a frontend-only application

No authentication or user roles

Signature field is implemented as a text-based confirmation

Data is stored in memory (no persistence across refresh)

->Limitations

No backend or database integration

Data resets on page refresh

No drag-and-drop field placement

No automated tests included

No visual status timeline

These choices were intentional to focus on core functionality, clean logic, and assignment requirements.