## MODIFIED Requirements

### Requirement: Homepage lists case studies newest first
The homepage work list SHALL show every case study in the order given by a single, centrally maintained display-order list, initially 05, 02, 01, 04, 03. Changing the display order SHALL require editing only that one list, and SHALL NOT change any case study's number, page address or asset paths.

#### Scenario: Homepage order
- **WHEN** a visitor views the homepage work list
- **THEN** the cards appear top to bottom as 05, 02, 01, 04, 03 (in a two-column grid, reading left-to-right then top-to-bottom)

#### Scenario: Odd number of cards
- **WHEN** the work list has five cards in the two-column layout
- **THEN** the last row contains one card and the remaining cell may stay empty, with every card still revealing on scroll

#### Scenario: Reordering keeps addresses
- **WHEN** the display-order list is changed to put a different case first
- **THEN** the homepage order updates accordingly and every case study remains reachable at its existing `/work/<number>` address

#### Scenario: Order list out of sync with case studies
- **WHEN** the display-order list omits an existing case study, names a case study that does not exist, or names one twice
- **THEN** the site build fails with an error identifying the mismatch, rather than silently hiding or duplicating a case

---
### Requirement: Next-case link follows the homepage order
Each case study page SHALL link to "下一篇案例", which is the case study that follows it in the homepage display order, and the last case study in that order SHALL link back to the first.

#### Scenario: Next case from a middle case
- **WHEN** a visitor is on case 02 and follows "下一篇案例"
- **THEN** they land on case 01

#### Scenario: Wrap-around
- **WHEN** a visitor is on case 03 (last in the display order) and follows "下一篇案例"
- **THEN** they land on case 05
