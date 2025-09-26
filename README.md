# Plawright Code Exam Framework

## Overview
This framework covers testing for qa-practive.netlify.app/bugs form page

## Folder Structure
-   **fixture**: Includes custom playwright fixtures
-   **helpers**: Includes multiple helper classes
-   **interface**: Includes test data interfaces
-   **pages**: Includes page object model classes
-   **tests**: Includes test files

## BDD Decorators Usage
This framework includes BDD decorator to group steps into readable BDD format for the HTML report

    ```ts
    @when('User navigates to Bugs Form Page')
    async goto() {
    await this.page.goto('/bugs-form');
    }
    ```