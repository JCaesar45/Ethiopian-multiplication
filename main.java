public class EthiopianMultiplication {
    
    // Helper functions
    public static int halve(int n) {
        return n / 2;
    }
    
    public static int double(int n) {
        return n * 2;
    }
    
    public static boolean isEven(int n) {
        return n % 2 == 0;
    }
    
    // Ethiopian multiplication function
    public static int ethMult(int a, int b) {
        int result = 0;
        int left = a;
        int right = b;
        
        while (left >= 1) {
            if (!isEven(left)) {
                result += right;
            }
            left = halve(left);
            right = double(right);
        }
        
        return result;
    }
    
    // Test cases
    public static void main(String[] args) {
        System.out.println(ethMult(17, 34));  // 578
        System.out.println(ethMult(23, 46));  // 1058
        System.out.println(ethMult(12, 27));  // 324
        System.out.println(ethMult(56, 98));  // 5488
        System.out.println(ethMult(63, 74));  // 4662
    }
}
