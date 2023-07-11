export default function SelectOptions() {
  return (
    <section>
      <div></div>
      <form>
        <label>
          <input type="radio" value="option1" name="select" />
          Option1
        </label>
        <label>
          <input type="radio" value="option2" name="select" />
          Option2
        </label>
        <div>
          <button type="submit">화살표</button>
        </div>
      </form>
    </section>
  );
}
