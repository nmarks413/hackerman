var fluff = `
import java.util.Arrays;
import java.awt.Rectangle;

/**
 * A sample of a ploymorphic method.
 *
 */

public class CreateASet {

    public static void main(String[] args){
        String[] words = {"A", "B", "B", "D", "C", "A"};
        System.out.println( "original: " + Arrays.toString(words));
        System.out.println( "as a set: " + Arrays.toString(makeSet(words)));

        Rectangle[] rectList = {new Rectangle(), new Rectangle(),
                    new Rectangle(0, 1, 2, 3), new Rectangle(0, 1, 2, 3)};
        System.out.println( "original: " + Arrays.toString(rectList));
        System.out.println( "as a set: " + Arrays.toString(makeSet(rectList)));


        Object[] mixed = {"A", "C", "A", "B", new Rectangle(),
                new Rectangle(), "A", new Rectangle(0, 1, 2, 3), "D"};
        System.out.println( "original: " + Arrays.toString(mixed));
        System.out.println( "as a set: " + Arrays.toString(makeSet(mixed)));
    }

    /**
     * An example of polymorphism in action. The method relies
     * on Java's inheritance requirement and polymorhphism to call
     * the correct equals method.
     * @param data != null, no elements of data are null
     * @return a Set (no duplicates) of the elements in data.
     */
    public static Object[] makeSet(Object[] data){
        assert data != null : "Failed precondition makeSet. parameter cannot be null";
        assert noNulls(data) : "Failed precondition makeSet. no elements of parameter can be null";
        Object[] result = new Object[data.length];
        int numUnique = 0;
        boolean found;
        int indexInResult;
        for(int i = 0; i < data.length; i++){
            // maybe should break this out into another method
            indexInResult = 0;
            found = false;
            while(!found && indexInResult < numUnique){
                found = data[i].equals(result[indexInResult]);
                indexInResult++;
            }
            if( ! found ){
                result[numUnique] = data[i];
                numUnique++;
            }
        }
        Object[] result2 = new Object[numUnique];
        System.arraycopy(result, 0, result2, 0, numUnique);
        return result2;
    }

    // pre: data != null
    // return true if all elements of data are non null,
    // false otherwise
    private static boolean noNulls(Object[] data){
        assert data != null : "Failed precondition makeSet. parameter cannot be null";
        boolean good = true;
        int i = 0;
        while( good && i < data.length ){
            good = data[i] != null;
            i++;
        }
        return good;
    }

}

public class RecursionExampleDirectory
{
  public int getSize(Directory dir)
  {	int total = 0;

    //check files
    File[] files = dir.getFiles();
    for(int i = 0; i < files.length; i++)
      total += files[i].getSize();

    //get sub directories and check them
    Directory[] subs = dir.getSubs();
    for(int i = 0; i < subs.length; i++)
      total += getSize(subs[i]);

    return total;
  }

  public static void main(String[] args)
  {	RecursionExampleDirectory r = new RecursionExampleDirectory();
    Directory d = new Directory();
    System.out.println( r.getSize(d) );
  }

  //pre: n >= 0
  public static int fact(int n)
  {	int result = 0;
    if(n == 0)
      result = 1;
    else
      result = n * fact(n-1);
    return result;
  }

  //pre: exp >= 0
  public static int pow(int base, int exp)
  {	int result = 0;
    if(exp == 0)
      result = 1;
    else
      result = base * pow(base, exp - 1);
    return result;
  }

  //slow fib
  //pre: n >= 1
  public static int fib(int n)
  {	int result = 0;
    if(n == 1 || n == 2)
      result = 1;
    else
      result = fib(n-1) + fib(n-2);
    return result;
  }

  public static int minWasted(int[] items, int itemNum, int capLeft)
  {	int result = 0;
    if(itemNum >= items.length)
      result = capLeft;
    else if( capLeft == 0)
      result = 0;
    else
    {	int minWithout = minWasted(items, itemNum + 1, capLeft);
      if( capLeft <= items[itemNum])
      {	int minWith = minWasted(items, itemNum + 1, capLeft - items[itemNum]);
        result = Math.min(minWith, minWithout);
      }
      else
        result = minWithout;
    }
    return result;
  }
}

class Directory
{	private Directory[] mySubs;
  private File[] myFiles;

  public Directory()
  {	int numSubs = (int)(Math.random() * 3);
    mySubs = new Directory[numSubs];
    int numFiles = (int)(Math.random() * 10);
    myFiles = new File[numFiles];

    for(int i = 0; i < myFiles.length; i++)
      myFiles[i] = new File( (int)(Math.random() * 1000 ) );
    for(int i = 0; i < mySubs.length; i++)
      mySubs[i] = new Directory();
  }

  public Directory[] getSubs()
  {	return mySubs;
  }

  public File[] getFiles()
  {	return myFiles;
  }
}

class File
{	private int iMySize;

  public File(int size)
  {	iMySize = size;
  }

  public int getSize()
  {	return iMySize;
  }
}

import java.util.LinkedList;
import java.lang.reflect.Array;

public class UnsortedHashSet<E> {

    private static final double LOAD_FACTOR_LIMIT = 0.7;

    private int size;
    private LinkedList<E>[] con;

    public UnsortedHashSet() {
        con  = (LinkedList<E>[])(new LinkedList[10]);
    }

    public boolean add(E obj) {
        int oldSize = size;
        int index = Math.abs(obj.hashCode()) % con.length;
        if(con[index] == null)
            con[index] = new LinkedList<E>();
        if(!con[index].contains(obj)) {
            con[index].add(obj);
            size++;

        }
        if(1.0 * size / con.length > LOAD_FACTOR_LIMIT)
            resize();
        return oldSize != size;
    }

    private void resize() {
        UnsortedHashSet<E> temp = new UnsortedHashSet<E>();
        temp.con = (LinkedList<E>[])(new LinkedList[con.length * 2 + 1]);
        for(int i = 0; i < con.length; i++){
            if(con[i] != null)
                for(E e : con[i])
                    temp.add(e);
        }
        con = temp.con;
    }

    public int size() {
        return size;
    }
}

/**
 * A class that represents a node to be used in a linked list.
 * These nodes are singly linked.
 */

 public class ListNode
 {
   // instance variables

  // the data to store in this node
  private Object myData;

  // the link to the next node (presumably in a list)
  private ListNode myNext;

  /**
   * default constructor
   * pre: none<br>
   * post: getData() = null, getNext() = null
   */
  public ListNode()
  {	this(null, null);
  }

  /**
   * create a ListNode that holds the specified data and refers to the specified next element
   * pre: none<br>
   * post: getData() = item, getNext() = next
   * @param item the  data this ListNode should hold
   * @param next the next node in the list
   */
  public ListNode(Object data, ListNode next)
  {	myData = data;
    myNext = next;
  }


  /**
   * return the data in this node
   * pre: none<br>
   * @return the data this ListNode holds
   */
  public Object getData()
  {	return myData;	}


  /**
   * return the ListNode this ListNode refers to
   * pre: none<br>
   * @return the ListNode this ListNode refers to (normally the next one in a list)
   */
  public ListNode getNext()
  {	return myNext;	}

  /**
   * set the data in this node
   * The old data is over written.<br>
   * pre: none<br>
   * @param data the new data for this ListNode to hold
   */
  public void setData(Object data)
  {	myData = data;	}

  /**
   * set the next node this ListNode refers to
   * pre: none<br>
   * @param next the next node this ListNode should refer to
   */
  public void setNext(ListNode next)
  {	myNext = next;	}
 }
`.split('\n')


var i = 0

document.addEventListener("keypress", hackerman);
function hackerman(){
  let node = document.createTextNode(fluff[i]);
  i++;
  if (i>303) {i=0;};
  let p = document.createElement("p");
  p.appendChild(node);
  document.body.appendChild(p);
}
