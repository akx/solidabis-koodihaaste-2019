# Solidabis Koodihaaste 2019

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Notes

### Bullshit Detection Rationale

* Since each string of bullshit is encoded with a variable Caesar shift, we need to figure out which, if any,
  of the shift values results in a correct Finnish phrase.
* The bullshit decoder uses a table of ngrams extracted from a Wiktionary list of Finnish words, so as to
  avoid including a full dictionary in the source code. (See the scripts/ directory.)
* The detection threshold is tuneable, and the default is carefully selected to seem to bring the best result
  of found phrases vs. false positives.  The threshold could be further optimized using sophisticated machine
  learning, I'm sure.
  
### Remote Data

* As mentioned in the `useRemoteBullshit` hook, the API server for the challenge does not (or at least did not)
  allow the CORS preflight OPTIONS request, so the data from the bullshit URL is included within the repository.

## Usage

Run: `yarn start` to run the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
