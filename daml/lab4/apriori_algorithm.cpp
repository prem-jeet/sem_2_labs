#include <iostream>
#include <fstream>
#include <vector>
#include <set>
#include <map>
#include <cmath>
#include <iomanip>

using namespace std;

const double MIN_SUPPORT = 0.6;    // Minimum support threshold
const double MIN_CONFIDENCE = 0.7; // Minimum confidence threshold

// Function to calculate support of an itemset
double calculateSupport(const vector<set<int>> &transactions, const set<int> &itemset)
{
    int count = 0;
    for (const auto &transaction : transactions)
    {
        bool contains = true;
        for (int item : itemset)
        {
            if (transaction.find(item) == transaction.end())
            {
                contains = false;
                break;
            }
        }
        if (contains)
            count++;
    }
    return static_cast<double>(count) / transactions.size();
}

// Generate candidate itemsets of size k
set<set<int>> generateCandidates(const set<set<int>> &prevFrequent)
{
    set<set<int>> candidates;
    for (auto it1 = prevFrequent.begin(); it1 != prevFrequent.end(); ++it1)
    {
        for (auto it2 = next(it1); it2 != prevFrequent.end(); ++it2)
        {
            set<int> merged(it1->begin(), it1->end());
            merged.insert(it2->begin(), it2->end());
            if (merged.size() == it1->size() + 1)
            {
                candidates.insert(merged);
            }
        }
    }
    return candidates;
}

// Function to generate all non-empty proper subsets of a set
vector<set<int>> generateSubsets(const set<int> &itemset)
{
    vector<int> items(itemset.begin(), itemset.end());
    int n = items.size();
    vector<set<int>> subsets;

    for (int mask = 1; mask < (1 << n) - 1; mask++)
    { // Exclude empty set and full set
        set<int> subset;
        for (int i = 0; i < n; i++)
        {
            if (mask & (1 << i))
            {
                subset.insert(items[i]);
            }
        }
        subsets.push_back(subset);
    }
    return subsets;
}

int main()
{
    ifstream infile("transactions.txt");
    ofstream outfile("association_rules.txt");
    int numTransactions, numItems;
    infile >> numTransactions >> numItems;

    vector<set<int>> transactions;
    for (int i = 0; i < numTransactions; i++)
    {
        string tid;
        infile >> tid;
        set<int> transaction;
        for (int j = 1; j <= numItems; j++)
        {
            int presence;
            infile >> presence;
            if (presence)
                transaction.insert(j);
        }
        transactions.push_back(transaction);
    }

    set<set<int>> frequentItemsets;
    map<set<int>, double> supportCount;

    // Initial candidate itemsets (single items)
    set<set<int>> candidates;
    for (int i = 1; i <= numItems; i++)
    {
        candidates.insert({i});
    }

    // Apriori Algorithm
    while (!candidates.empty())
    {
        set<set<int>> nextFrequent;
        cout << "\nChecking candidates of size " << candidates.begin()->size() << ":\n";
        for (const auto &itemset : candidates)
        {
            double support = calculateSupport(transactions, itemset);
            if (support >= MIN_SUPPORT)
            {
                nextFrequent.insert(itemset);
                supportCount[itemset] = support;
                cout << "Selected: { ";
                for (int item : itemset)
                    cout << "Item" << item << " ";
                cout << "} - Support: " << fixed << setprecision(4) << support << "\n";
            }
            else
            {
                cout << "Discarded: { ";
                for (int item : itemset)
                    cout << "Item" << item << " ";
                cout << "} - Support: " << fixed << setprecision(4) << support << "\n";
            }
        }
        frequentItemsets.insert(nextFrequent.begin(), nextFrequent.end());
        candidates = generateCandidates(nextFrequent);
    }

    // Generate Association Rules
    cout << "\nAssociation Rules (Confidence >= " << MIN_CONFIDENCE * 100 << "%):\n";
    outfile << "Association Rules (Confidence >= " << MIN_CONFIDENCE * 100 << "%):\n";
    for (const auto &itemset : frequentItemsets)
    {
        if (itemset.size() < 2)
            continue;

        vector<set<int>> subsets = generateSubsets(itemset);
        for (const auto &antecedent : subsets)
        {
            set<int> consequent;
            for (int item : itemset)
            {
                if (antecedent.find(item) == antecedent.end())
                {
                    consequent.insert(item);
                }
            }

            double antecedentSupport = calculateSupport(transactions, antecedent);
            double itemsetSupport = supportCount[itemset];
            double confidence = itemsetSupport / antecedentSupport;

            if (confidence >= MIN_CONFIDENCE)
            {
                cout << "\n{ ";
                outfile << "\n{ ";
                for (int item : antecedent)
                {
                    cout << "Item" << item << " ";
                    outfile << "Item" << item << " ";
                }
                cout << "} => { ";
                outfile << "} => { ";
                for (int item : consequent)
                {
                    cout << "Item" << item << " ";
                    outfile << "Item" << item << " ";
                }
                cout << "} (Confidence: " << fixed << setprecision(4) << confidence * 100 << "%)\n";
                outfile << "} (Confidence: " << fixed << setprecision(4) << confidence * 100 << "%)\n";
            }
        }
    }

    infile.close();
    outfile.close();
    return 0;
}