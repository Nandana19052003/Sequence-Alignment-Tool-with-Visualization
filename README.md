# Sequence-Alignment-Tool-with-Visualization

https://docs.google.com/document/d/1mWQY7a2S40Hcw6PpRgk_4wo35-42QFqKFROuQWNfVxc/edit?usp=sharing

Project done by <br>

Nandana - 21021

Santhosh - 21042

Chadda Narasimha Reddy - 21073

IndraKiran - 21078



# Sequence Alignment using Needleman-Wunsch and Smith-Waterman Algorithms
## Introduction
Sequence alignment is a fundamental problem in bioinformatics used to identify similarities and differences between biological sequences. The Needleman-Wunsch and Smith-Waterman algorithms are popular dynamic programming algorithms used for global and local sequence alignment, respectively. In this project, we implemented both algorithms, compared their performances on different datasets, and analyzed their accuracy, computational complexity, and memory requirements.

## Methodology
### Step 1: Implementation
Implemented the Needleman-Wunsch algorithm to perform global sequence alignment.
Implemented the Smith-Waterman algorithm to perform local sequence alignment.
Utilized dynamic programming to compute the alignment scores and traceback paths.

### Step 2: Computational Complexity Analysis
Prepared datasets with varying sequence lengths.
Ran the Needleman-Wunsch and Smith-Waterman algorithms on these datasets.
Recorded the execution time for each dataset.
Plotted the execution time vs. sequence length to analyze the computational complexity.

### Step 3: Memory Requirements Analysis
Used memory profiling tools to measure the memory consumption of the algorithms.
Profiled the memory usage as the size of the input sequences increased.
Recorded the memory consumption for each algorithm.
Compared the memory requirements of Needleman-Wunsch and Smith-Waterman algorithms.

### Step 4: Analyzing the Alignment Results
Evaluated the accuracy of the alignment results by comparing them with known correct alignments.
Analyzed the computational complexity by measuring the execution time for datasets of varying sizes.
Compared the execution times of the Needleman-Wunsch and Smith-Waterman algorithms.
Analyzed the memory consumption data to understand their relative memory usage.

### Step 5: Conclusion and Optimization (Optional)
Drew conclusions about the relative memory requirements of the Needleman-Wunsch and Smith-Waterman algorithms.
Discussed trade-offs between memory usage and other performance metrics.
Explored possible optimizations to reduce memory consumption.
Implemented optimized versions of the algorithms and compared their memory usage.


## Results
### Computational Complexity Analysis
Plotted the execution time vs. sequence length for both algorithms.
Analyzed the trends in computational complexity as the sequence length increased.
Compared the execution times of the Needleman-Wunsch and Smith-Waterman algorithms.

### Memory Requirements Analysis
Measured the memory consumption of the algorithms for datasets of varying sizes.
Compared the memory usage between the Needleman-Wunsch and Smith-Waterman algorithms.
Analyzed the impact of sequence length on the difference in memory usage.

### Conclusion
Based on the analysis, the Needleman-Wunsch algorithm was found to be more memory-efficient compared to the Smith-Waterman algorithm.
The choice of algorithm depends on the specific requirements of the application, balancing memory usage with accuracy and runtime.
Optimizations, such as using memory-efficient data structures, can further reduce memory consumption.

### Limitations and Future Work
This project focused on the implementation and analysis of the Needleman-Wunsch and Smith-Waterman algorithms. Other sequence alignment algorithms could be explored for comparison.
The analysis was performed on a limited set of datasets. Further experiments with diverse datasets can provide more comprehensive insights.
The optimizations implemented in this project were basic. Advanced techniques, such as parallelization or memory pooling, can be explored for further memory optimization.

## Conclusion
In this project, we implemented the Needleman-Wunsch and Smith-Waterman algorithms for sequence alignment and analyzed their performance. Through computational complexity analysis, we gained insights into the algorithms' efficiency as the sequence length increased. Memory requirements analysis highlighted the memory consumption differences between the algorithms. Based on the results, we discussed trade-offs between memory usage and other performance metrics. Additionally, we explored optimizations to reduce memory consumption. This project provides a foundation for understanding and applying sequence alignment algorithms in bioinformatics research and applications.
